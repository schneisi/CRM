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
            let theListGrid = new ListGrid();
            currentView.appointmentListGrid = theListGrid; 
            theListGrid.showTitle = false;
            theListGrid.clickEventSelector = currentView.appointmentClicked;
            theListGrid.addListGridField(new ListGridField("", anAppointment => anAppointment.dateString()));
            theListGrid.addListGridField(new ListGridField("", anAppointment => anAppointment.title()));

            let theAppointmentsList = Appointment.createObjectsFromSnapshot(aSnapshot, Appointment);
            theAppointmentsList.forEach(function (eachAppointment) {
                theListGrid.objects.push(eachAppointment);
            });
            document.getElementById("appointmentsDiv").innerHTML = theListGrid.getHtml();
        };
        FbDatabase.getDatabaseSnapshot("appointments", theCallback, "date", FbDatabase.valueForDate(new Date()), null, 3);
    }

    appointmentClicked(anIndex) {
        let theAppointment = this.appointmentListGrid.objects[anIndex];
        setActionId(theAppointment.key());
        navigateToViewWithId("appointment");
    }
}
