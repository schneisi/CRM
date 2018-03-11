class DashboardView extends BaseView{
    initializeView(){
        this.name = "Dashboard";
        if(!isOnline()){
            document.getElementById("rssWidget").style.display = "none";
        }
        
        this.showNextAppointments();
        this.showUpcomingBirthdays();
    }
    
    navigateToCustomersClicked() {
        navigateToViewWithId("customers");
    }
    
    navigateToAppointmentsClicked(){
        navigateToViewWithId("appointments");
    }
    
    showNextAppointments() {
        let theListGrid = new ListGrid();
        currentView.appointmentListGrid = theListGrid; 
        theListGrid.showTitle = false;
        theListGrid.clickEventSelector = currentView.appointmentClicked;
        theListGrid.addListGridField(new ListGridField("", anAppointment => anAppointment.dateString()));
        theListGrid.addListGridField(new ListGridField("", anAppointment => anAppointment.title()));

        theListGrid.objects = Appointment.upcomingAppointments;
        theListGrid.setAsChildOf(document.getElementById("appointmentsDiv"));
    }

    showUpcomingBirthdays() {
        let theDiv = document.getElementById("birthdayDiv");
        if (Customer.upcomingBirthdays.length > 0) {
            let theBirthdayGrid = new ListGrid();
            this.birthdayListGrid = theBirthdayGrid;
            theBirthdayGrid.showTitle = false;
            theBirthdayGrid.clickEventSelector = this.birthdayClicked;
            theBirthdayGrid.addListGridField(new ListGridField("", aCustomer => aCustomer.birthdayString()));
            theBirthdayGrid.addListGridField(new ListGridField("", aCustomer => aCustomer.fullName()))
            theBirthdayGrid.objects = Customer.upcomingBirthdays;
            theBirthdayGrid.setAsChildOf(theDiv);
        } else {
            theDiv.innerHTML = "Keine Anstehende Geburtstage";
        }
       
    }

    appointmentClicked(anAppointment) {
        setActionId(anAppointment.key());
        navigateToViewWithId("appointment");
    }

    birthdayClicked(aCustomer) {
        setActionId(aCustomer.key());
        navigateToViewWithId("customer");
    }
}