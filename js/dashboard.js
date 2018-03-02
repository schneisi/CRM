include("model/Appointment.js");

class DashboardView extends BaseView{
    initializeView(){
        if(!isOnline()){
            document.getElementById("rssWidget").style.display = "none";
        }
        this.showNextAppointments();
    }
    
    navigateToCustomersClicked() {
        navigateToViewWithId("customers", false);
    }
    
    navigateToAppointmentsClicked(){
        navigateToViewWithId("appointments", false);
    }
    
    showNextAppointments() {
        let theCallback = function (aSnapshot) {
            let theAppointmentsList = Appointment.createObjectsFromSnapshot(aSnapshot, Appointment);
            theAppointmentsList.forEach(function (eachAppointment) {
                let eachLi = document.createElement("li");
                eachLi.innerHTML = eachAppointment.dashboardRepresentation();
                eachLi.className= "dashboard"
                document.getElementById("appointmentList").appendChild(eachLi);
            });
        };
        FbDatabase.getDatabaseSnapshot("appointments", theCallback, "date", FbDatabase.valueForDate(new Date()), null, 3);
    }
}
