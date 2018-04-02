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
        theListGrid.clickEventSelector = this.appointmentClicked;
        theListGrid.noElementsString = "Keine anstehenden Termine";
        theListGrid.addListGridField(new ListGridField("Datum", anAppointment => anAppointment.dateString()));
        theListGrid.addListGridField(new ListGridField("Titel", anAppointment => anAppointment.title()));

        theListGrid.objects = Appointment.upcomingAppointments;
        theListGrid.setAsChildOf(document.getElementById("appointmentsDiv"));
    }

    showUpcomingBirthdays() {
        let theDiv = document.getElementById("birthdayDiv");
        
        let theBirthdayGrid = new ListGrid();
        this.birthdayListGrid = theBirthdayGrid;
        theBirthdayGrid.showTitle = false;
        theBirthdayGrid.noElementsString = "Keine anstehenden Geburtstage";
        theBirthdayGrid.clickEventSelector = this.birthdayClicked;
        theBirthdayGrid.addListGridField(new ListGridField("Geburtstag", aCustomer => aCustomer.birthdayString()));
        theBirthdayGrid.addListGridField(new ListGridField("Name", aCustomer => aCustomer.fullName()))
        theBirthdayGrid.objects = Customer.upcomingBirthdays;
        theBirthdayGrid.setAsChildOf(theDiv);
       
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