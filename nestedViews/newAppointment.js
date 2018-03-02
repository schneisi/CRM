include("model/Appointment.js");

class NewAppointmentView extends BaseView {
    initializeView() {
        showSaveButton(this.saveNewAppointment);
        this.setComponents();
        if (hasActionId()){
            FbDatabase.getDatabaseSnapshot("/appointments/" + getActionId(), function(aSnapshot) {
                let theAppointment = new Appointment(aSnapshot);
                currentView.appointment = theAppointment;
                currentView.titleField.value = theAppointment.title();
                currentView.titleField.parentElement.classList.add("is-dirty");
                currentView.zipField.value = theAppointment.zip();
                currentView.zipField.parentElement.classList.add("is-dirty");
                currentView.placeField.value = theAppointment.place();
                currentView.placeField.parentElement.classList.add("is-dirty");
                currentView.streetField.value = theAppointment.street();
                currentView.streetField.parentElement.classList.add("is-dirty");
                currentView.noteField.value = theAppointment.notes();
                currentView.noteField.parentElement.classList.add("is-dirty");
            });
        }
    }

    setComponents() {
        this.titleField = document.getElementById("appointmentTitle");
        this.zipField = document.getElementById("zip");
        this.placeField = document.getElementById("location");
        this.streetField = document.getElementById("street");
        this.noteField = document.getElementById("notes");
    }
    
    
    saveNewAppointment() {
        let theBuilder = new AppointmentBuilder(this.appointment);
        theBuilder.title = document.getElementById("appointmentTitle").value;
        theBuilder.date = new Date();
        theBuilder.place = document.getElementById("location").value;
        theBuilder.street = document.getElementById("street").value;
        theBuilder.zip = document.getElementById("zip").value;
        theBuilder.notes = document.getElementById("notes").value;
        theBuilder.create();
        navigateToViewWithId("appointments");
    }
}
