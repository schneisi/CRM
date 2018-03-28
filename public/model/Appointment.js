class Appointment extends BaseDatabaseObject {

    //Attributes
    title() {
        return this.getValueOfChild("title");
    }
    date() {
        return FSDatabase.dateForValue(this.getValueOfChild("date"));
    }
    dateString() {
        return this.dateOnlyString() + " " + this.timeOnlyString();
    }
    hasStreet() {
        return this.hasChild("address.street");
    }
    street() {
        return this.getValueOfChild("address.street");
    }
    hasPlace() {
        return this.hasChild("address.place");
    }
    place() {
        return this.getValueOfChild("address.place");
    }
    hasZip() {
        return this.hasChild("address.zip");
    }
    zip() {
        return this.getValueOfChild("address.zip");
    }
    hasNotes() {
        return this.hasChild("notes");
    }
    notes() {
        return this.getValueOfChild("notes");
    }
    reminded() {
        return this.getValueOfChild("reminded");
    }

    //API
    static setUpcomingAppointments (anArry) {
        this.upcomingAppointments = anArry;
        let theCurrentDate = new Date();
        anArry.forEach(eachAppointment => {
            if (!eachAppointment.reminded()) {
                let theDifferenceInSeconds = eachAppointment.date().getTime() - theCurrentDate.getTime();
                let theDuration = moment.duration(theDifferenceInSeconds, "milliseconds");
                if (theDuration.asMinutes() < 10) {
                    showNotification("Bevorstehender Termin", eachAppointment.title(), "appointment", eachAppointment.key());
                    let theBuilder = new AppointmentBuilder(eachAppointment);
                    theBuilder.reminded = true;
                    theBuilder.save();
                }
            }
        });
    }

    static createTask() {
        //AppointmentTask
        let theAppointmentTaskName = "AppointmentTask";
        if (!Scheduler.instance.hasTaskWithName(theAppointmentTaskName)){
            let theTask = new ScheduledTask(theAppointmentTaskName, function() {
                let theCallback = aSnapshot => {
                    Appointment.setUpcomingAppointments(Appointment.createObjectsFromSnapshot(aSnapshot, Appointment));
                    if (currentView instanceof DashboardView) {
                        currentView.showNextAppointments();
                    }
                };
                let theOptions = {
                    orderChild: "date",
                    startObject: FSDatabase.valueForDate(new Date()),
                    limit: 3
                }
                FSDatabase.getDatabaseSnapshotForCollection("users/" + FSDatabase.getCurrentUserId() + "/appointments", theCallback, null, theOptions);
            }, 10);
            Scheduler.instance.addTask(theTask);
        }
    }
    isoDateOnlyString() {
        return this.isoStringForDate(this.date());
    }
    dateOnlyString() {
        return this.stringForDate(this.date());
    }
    timeOnlyString() {
        return moment(this.date()).format("HH:mm");
    }
    addressString() {
        return this.street() + " " + this.zip() + " " + this.place();
    }
}
Appointment.createTask();
Appointment.upcomingAppointments = [];



class AppointmentBuilder extends BaseBuilder {
    constructor(anObject) {
        super(anObject);
        if (anObject) {
            this.title = anObject.title();
            this.date = anObject.date();
            this.place = anObject.place();
            this.zip = anObject.zip();
            this.street = anObject.street();
            this.notes = anObject.notes();
            this.reminded = this.object.reminded();
        } else {
            this.reminded = false;
        }
    }

    path () {
        return "users/" + FSDatabase.getCurrentUserId() + "/appointments";
    }

    dateValue() {
        return FSDatabase.valueForDate(this.date);
    }

    getJson() {
        let theJsonObject = {};
        theJsonObject.address = {};
        if (this.title) theJsonObject.title = this.title;
        if (this.date) theJsonObject.date = this.dateValue();
        if (this.notes) theJsonObject.notes = this.notes;
        if (this.place) theJsonObject.address.place = this.place;
        if (this.zip) theJsonObject.address.zip = this.zip;
        if (this.street) theJsonObject.address.street = this.street;
        if (Object.keys(theJsonObject.address).length == 0) {
            delete theJsonObject["address"];
        }
        theJsonObject.reminded = this.reminded;
        return theJsonObject;
    }

    //Error
    errorForNumber(aNumber) {
        let theErrorText;
        switch(aNumber) {
            case 1:
                theErrorText = "Titel ist Pflichtfeld";
                break;
            default:
                throw "Error: No error found";
        }
        return new BuilderError(aNumber, theErrorText);
    }
    check() {
        if (!this.title || this.title.length == 0) {
            this.addError(1);
        }
    }
}