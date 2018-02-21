function initializeAppointments() {
    //TODO: Not Correct. Has to be the content-div, not the container
    const contentDiv = document.getElementById("contentContainer");

    let theList = new ListGrid();
    theList.addListGridField(new ListGridField("Termine", anObject => anObject.value));
    theList.clickEventSelector = appointmentClicked;
    theList.objects.push(new ListGridHelper("Test", "Beispieltermin"));
    let theDiv = document.createElement("div");
    theDiv.innerHTML = theList.getHtml();
    contentDiv.appendChild(theDiv);
}

function addNewAppointmentClicked(){
    navigateToViewWithId("newAppointment", false);
}

function appointmentClicked(){
    navigateToViewWithId("appointment", false);
}