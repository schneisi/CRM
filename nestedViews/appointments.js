let theAppointmentList;

function initializeAppointments() {
    const contentDiv = document.getElementById("content");

    theAppointmentList = new ListGrid();
    theAppointmentList.addListGridField(new ListGridField("Datum", anAppointment => anAppointment.dateString()));
    theAppointmentList.addListGridField(new ListGridField("Titel", anAppointment => anAppointment.title()));

    theAppointmentList.clickEventSelector = appointmentClicked;

    FbDatabase.getDatabaseSnapshot("appointments", function(aSnapshot) {

        Appointment.createObjectsFromSnapshot(aSnapshot, Appointment, function (anAppointmentsList) {
            theAppointmentList.objects = anAppointmentsList;
        });
        let theDiv = document.createElement("div");
        theDiv.innerHTML = theAppointmentList.getHtml();
        contentDiv.appendChild(theDiv);
        hideSpinner();
    });
}

function addNewAppointmentClicked(){
    navigateToViewWithId("newAppointment", false);
}

function appointmentClicked(anIndex){
    let theAppointment = theAppointmentList.objects[anIndex];
    setActionId(theAppointment.key());
    navigateToViewWithId("appointment", false);
}