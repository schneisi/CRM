class AppointmentsView extends BaseView {
    
    initializeView() {
        this.appointmentList = new ListGrid();
        let theAppointmentList = this.appointmentList;
        theAppointmentList.addListGridField(new ListGridField("Datum", anAppointment => anAppointment.dateString()));
        theAppointmentList.addListGridField(new ListGridField("Titel", anAppointment => anAppointment.title()));
        theAppointmentList.clickEventSelector = this.appointmentClicked;
        theAppointmentList.deleteSelector = this.appointmentDeleteClicked;

        let theOptions = {
            orderChild: "date"
        }
        FSDatabase.getDatabaseSnapshotForCollection("users/" + FSDatabase.getCurrentUserId() + "/appointments", function(aSnapshot) {
            theAppointmentList.objects = Appointment.createObjectsFromSnapshot(aSnapshot, Appointment);
            document.getElementById("content").appendChild(theAppointmentList.getTableElement());
            hideSpinner();
        }, this, theOptions);
    }
    
    addNewAppointmentClicked() {
        resetActionId();
        navigateToViewWithId("newAppointment");
    }
    
    appointmentClicked(anAppointment){
        setActionId(anAppointment.key());
        navigateToViewWithId("appointment");
    }

    appointmentDeleteClicked(anAppointment) {
        anAppointment.aboutToDelete();
        return true;
    }
}
