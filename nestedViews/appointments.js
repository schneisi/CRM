class AppointmentsView extends BaseView {
    
    initializeView() {
        resetActionId();
        this.appointmentList = new ListGrid();
        let theAppointmentList = this.appointmentList;
        theAppointmentList.addListGridField(new ListGridField("Datum", anAppointment => anAppointment.dateString()));
        theAppointmentList.addListGridField(new ListGridField("Titel", anAppointment => anAppointment.title()));
        theAppointmentList.clickEventSelector = this.appointmentClicked;
    
        FbDatabase.getDatabaseSnapshot("appointments", function(aSnapshot) {
            theAppointmentList.objects = Appointment.createObjectsFromSnapshot(aSnapshot, Appointment);
            let theDiv = document.createElement("div");
            theDiv.innerHTML = theAppointmentList.getHtml();
            document.getElementById("content").appendChild(theDiv);
            hideSpinner();
        }, "date");
    }
    
    addNewAppointmentClicked(){
        navigateToViewWithId("newAppointment", false);
    }
    
    appointmentClicked(anIndex){
        let theAppointment = this.appointmentList.objects[anIndex];
        setActionId(theAppointment.key());
        navigateToViewWithId("appointment", false);
    }
}
