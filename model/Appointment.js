class Appointment extends BaseDatabaseObject {
    //Attributes
    title() {
        return this.getValueOfChild("title");
    }
    date() {
        return FbDatabase.dateForValue(this.getValueOfChild("date"));
    }
    dateString() {
        return this.date().toLocaleString("de-DE");
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

    //API
    isoDateOnlyString() {
        function getFullStringForNumber(aNumber) {
            if (aNumber < 10) {
                return "0" + aNumber;
            }
            return aNumber.toString();
        }
        let theDateMonth = this.date().getMonth() + 1;
        return this.date().getFullYear() + "-" + getFullStringForNumber(theDateMonth) + "-" + getFullStringForNumber(this.date().getDate());
    }
    timeOnlyString() {
        return this.date().getHours() + ":" + this.date().getMinutes();
    }
    dashboardRepresentation() {
        return this.dateString() + " " + this.title();
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