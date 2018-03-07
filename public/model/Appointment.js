class Appointment extends BaseDatabaseObject {

    //Attributes
    title() {
        return this.getValueOfChild("title");
    }
    date() {
        return FbDatabase.dateForValue(this.getValueOfChild("date"));
    }
    dateString() {
        return this.dateOnlyString() + " " + this.timeOnlyString();
    }
    street() {
        return this.getValueOfChild("address/street");
    }
    place() {
        return this.getValueOfChild("address/place");
    }
    zip() {
        return this.getValueOfChild("address/zip");
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
                let theDifference = eachAppointment.date().getTime() - theCurrentDate.getTime();
                theDifference = theDifference / (1000 * 60);
                if (theDifference < 10) {
                    showNotification("Bevorstehender Termin", eachAppointment.title(), function() {
                        setActionId(eachAppointment.key());
                        navigateToViewWithId("appointment");
                    });
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
                FbDatabase.getDatabaseSnapshot("appointments/" + FbDatabase.getCurrentUserId(), theCallback, "date", FbDatabase.valueForDate(new Date()), null, 3);

            }, 10);
            Scheduler.instance.addTask(theTask);
        }
    }
    isoDateOnlyString() {
        let theDateMonth = this.date().getMonth() + 1;
        return this.date().getFullYear() + "-" + this.getFullStringForNumber(theDateMonth) + "-" + this.getFullStringForNumber(this.date().getDate());
    }
    dateOnlyString() {
        return this.getFullStringForNumber(this.date().getDate()) + "." + this.getFullStringForNumber(this.date().getMonth() + 1) + "." + this.date().getFullYear();
    }
    timeOnlyString() {
        return this.getFullStringForNumber(this.date().getHours()) + ":" + this.getFullStringForNumber(this.date().getMinutes());
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
        this.path = "appointments/" + FbDatabase.getCurrentUserId();
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

    dateValue() {
        return FbDatabase.valueForDate(this.date);
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
}