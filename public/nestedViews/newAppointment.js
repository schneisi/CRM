class NewAppointmentView extends BaseView {
    initializeView() {
        showSaveButton(this.saveNewAppointment);
        this.setComponents();
        if (hasActionId()){
            FSDatabase.getDatabaseSnapshotForDoc("users/" + this.getUserId() + "/appointments/" + getActionId(), aSnapshot =>  {
                let theAppointment = new Appointment(aSnapshot);
                this.appointment = theAppointment;
                this.titleField.value = theAppointment.title();
                this.titleField.parentElement.classList.add("is-dirty");
                this.zipField.value = theAppointment.zip();
                this.zipField.parentElement.classList.add("is-dirty");
                this.placeField.value = theAppointment.place();
                this.placeField.parentElement.classList.add("is-dirty");
                this.streetField.value = theAppointment.street();
                this.streetField.parentElement.classList.add("is-dirty");
                this.noteField.value = theAppointment.notes();
                this.noteField.parentElement.classList.add("is-dirty");
                this.dateField.value = theAppointment.isoDateOnlyString();
                this.timeField.value = theAppointment.timeOnlyString();
            }, this);
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
        let theBuilder = new AppointmentBuilder(this.appointment);
        theBuilder.title = document.getElementById("appointmentTitle").value;
        theBuilder.place = document.getElementById("location").value;
        theBuilder.street = document.getElementById("street").value;
        theBuilder.zip = document.getElementById("zip").value;
        theBuilder.notes = document.getElementById("notes").value;
        theBuilder.date = new Date(this.dateField.value);
        theBuilder.date.setHours(this.timeField.value.split(":")[0]);
        theBuilder.date.setMinutes(this.timeField.value.split(":")[1]);
        if (theBuilder.save()) {
            //Success
            navigateToViewWithId("appointments");
        } else {
            showModal("Fehler", theBuilder.errorStringBrSeparated());
        }
    }
}