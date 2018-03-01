
function initializeNewAppointment() {
    showSaveButton(saveNewAppointment);

    if (hasActionId()){

        FbDatabase.getDatabaseSnapshot("/appointments/" + getActionId(), function(aSnapshot) {
            theAppointment = new Appointment(aSnapshot);
            let theTitleField = document.getElementById("appointmentTitle");
            theTitleField.value = theAppointment.title();
            theTitleField.parentElement.classList.add("is-dirty");
            let thePlaceField = document.getElementById("location");
            thePlaceField.value = theAppointment.place();
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
    console.log("Saving appointment")
}