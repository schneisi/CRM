class AppointmentView extends BaseView {
    initializeView(){
        showEditMenuButton();
        showDeleteMenuButton();

        FSDatabase.getDatabaseSnapshotForDoc("users/" + this.getUserId() + "/appointments/" + getActionId(), aSnapshot => {
            this.appointment = new Appointment(aSnapshot);
            this.showAppointment();
        }, this);
    }

    showAppointment() {
        const theContentDiv = document.getElementById("tableDiv");
        let theTable = new StaticList(["30%", "70%"]);
        let theAppointment = this.appointment;
        theTable
            .addRow(["Titel:", theAppointment.title()])
            .addRow(["Datum:", theAppointment.dateString()]);
        if (theAppointment.hasStreet()) {
            theTable.addRow(["Strasse:", theAppointment.street()]);
        }
        if (theAppointment.hasZip()) {
            theTable.addRow(["PLZ:", theAppointment.zip()]);
        }
        if (theAppointment.hasPlace()) {
            theTable.addRow(["Ort:", theAppointment.place()]);
        }
        if (theAppointment.hasNotes()) {
            theTable.addRow(["Notizen:", theAppointment.notes()]);
        }

        let theTableDiv = document.createElement("div");
        theTableDiv.innerHTML = theTable.getHtml();
        theContentDiv.innerHTML = "";
        theContentDiv.appendChild(theTableDiv);
        currentView.appointment = theAppointment;
    }

    editMenuButtonClicked() {
        navigateToViewWithId("newAppointment");
    }

    deleteMenuButtonClicked() {
        this.appointment.aboutToDelete();
        navigateToViewWithId("appointments");
    }

    mapsButtonClicked() {
        callGoogleMaps(this.appointment.addressString());
    }
}