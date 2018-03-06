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
                currentView.dateField.value = theAppointment.isoDateOnlyString();
                currentView.timeField.value = theAppointment.timeOnlyString();
            });
        }
    }

    setComponents() {
        this.titleField = document.getElementById("appointmentTitle");
        this.zipField = document.getElementById("zip");
        this.placeField = document.getElementById("location");
        this.streetField = document.getElementById("street");
        this.noteField = document.getElementById("notes");
        this.dateField = document.getElementById("appointmentDate");
        this.timeField = document.getElementById("appointmentTime");
    }
    
    
    saveNewAppointment() {
        console.log(this);
        let theBuilder = new AppointmentBuilder(this.appointment);
        theBuilder.title = document.getElementById("appointmentTitle").value;
        theBuilder.date = new Date();
        theBuilder.place = document.getElementById("location").value;
        theBuilder.street = document.getElementById("street").value;
        theBuilder.zip = document.getElementById("zip").value;
        theBuilder.notes = document.getElementById("notes").value;
        theBuilder.date = new Date(this.dateField.value + " " + this.timeField.value);
        theBuilder.save();
        navigateToViewWithId("appointments");
    }
}
