include("model/Appointment.js");

function initializeDashboard(){
    if(!isOnline()){
        document.getElementById("rssWidget").style.display = "none";
    }
    showNextAppointments();
}

function buttonClicked() {
    showModal("Titel", "Test");
}
function navigateToCustomersClicked() {
    navigateToViewWithId("customers", false);
}

function navigateToAppointmentsClicked(){
    navigateToViewWithId("appointments", false);
}

function showNextAppointments() {
    let theCallback = function (aSnapshot) {
        Appointment.createObjectsFromSnapshot(aSnapshot, Appointment, function (anAppointmentsList) {
            anAppointmentsList.forEach( function (eachAppointment) {
                let eachLi = document.createElement("li");
                eachLi.innerHTML = eachAppointment.dashboardRepresentation();
                document.getElementById("appointmentList").appendChild(eachLi);
            });
        });
    };
    FbDatabase.getDatabaseSnapshot("appointments", theCallback, "date", FbDatabase.valueForDate(new Date()), null, 3);
}