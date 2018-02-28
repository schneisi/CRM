class Appointment extends BaseDatabaseObject {
    title() {
        return this.getValueOfChild("title");
    }
    date() {
        return FbDatabase.dateForValue(this.getValueOfChild("date"));
    }
    dateString() {
        return this.date().toString();
    }
    dashboardRepresentation() {
        return this.date().toLocaleString("de-DE") + " " + this.title();
    }
}