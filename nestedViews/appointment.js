include("model/Appointment.js");

class AppointmentView extends BaseView {
    initializeView(){
        showDeleteMenuButton();
        FbDatabase.getDatabaseSnapshot("/appointments/" + getActionId(), function(aSnapshot) {
            let theAppointment = new Appointment(aSnapshot);
            const theContentDiv = document.getElementById("content");
            let theTable = new StaticList(["30%", "70%"]);

            theTable
                .addRow(["Titel:", theAppointment.title()])
                .addRow(["Datum:", theAppointment.dateString()])
                .addRow(["Strasse:", theAppointment.street()])
                .addRow(["PLZ:", theAppointment.zip()])
                .addRow(["Ort:", theAppointment.place()])
                .addRow(["Notizen:", theAppointment.notes()]);

            let theTableDiv = document.createElement("div");
            theTableDiv.innerHTML = theTable.getHtml();
            theContentDiv.appendChild(theTableDiv);
            currentView.appointment = theAppointment;
        });
    }

    deleteMenuButtonClicked() {
        this.appointment.aboutToDelete();
        navigateToViewWithId("appointments");
    }
}