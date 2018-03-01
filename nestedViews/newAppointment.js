include("model/Appointment.js");


function initializeNewAppointment() {
    showSaveButton(saveNewAppointment);

    if (hasActionId()){
        FbDatabase.getDatabaseSnapshot("/appointments/" + getActionId(), function(aSnapshot) {
            theAppointment = new Appointment(aSnapshot);
            let theTitleField = document.getElementById("appointmentTitle");
            theTitleField.value = theAppointment.title();
            theTitleField.parentElement.classList.add("is-dirty");
            let theZipField = document.getElementById("zip");
            theZipField.value = theAppointment.zip();
            theZipField.parentElement.classList.add("is-dirty");
            let thePlaceField = document.getElementById("location");
            theZipField.value = theAppointment.place();
            thePlaceField.parentElement.classList.add("is-dirty");
            let theStreetField = document.getElementById("street");
            theStreetField.value = theAppointment.street();
            theStreetField.parentElement.classList.add("is-dirty");
            let theNoteField = document.getElementById("notes");
            theNoteField.value = theAppointment.notes();
            theNoteField.parentElement.classList.add("is-dirty");
        });
    }
}

function handleClick(isNewCustomerRadio) {
    if (isNewCustomerRadio.value == 1){
        
    }
}


function saveNewAppointment() {
    let theBuilder = new AppointmentBuilder();
    theBuilder.title = document.getElementById("appointmentTitle").value;
    theBuilder.date = new Date();
    theBuilder.place = document.getElementById("location").value;
    theBuilder.street = document.getElementById("street").value;
    theBuilder.zip = document.getElementById("zip").value;
    theBuilder.notes = document.getElementById("notes").value;
    theBuilder.create();
    navigateToViewWithId("appointments");
}