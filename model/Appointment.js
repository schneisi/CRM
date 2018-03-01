class Appointment extends BaseDatabaseObject {
    title() {
        return this.getValueOfChild("title");
    }
    date() {
        return FbDatabase.dateForValue(this.getValueOfChild("date"));
    }
    dateString() {
        return this.date().toLocaleString("de-DE");
    }
    dashboardRepresentation() {
        return this.dateString() + " " + this.title();
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
}



class AppointmentBuilder extends BaseBuilder {
    constructor(anObject) {
        super (anObject);
        this.title = null;
        this.date = null;
        this.path = "appointments";
        this.place = null;
        this.zip = null;
        this.street = null;
        this.notes = null;
    }

    dateValue() {
        return FbDatabase.valueForDate(this.date);
    }

    getJson() {
        let theJsonObject = {
            title: this.title,
            date: this.dateValue(),
            notes: this.notes,
            address: {
                place: this.place,
                zip: this.zip,
                street: this.street,
            }
        }
        return theJsonObject;
    }
}