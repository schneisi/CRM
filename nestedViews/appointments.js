let theAppointmentList;

function initializeAppointments() {
    const contentDiv = document.getElementById("content");

    theAppointmentList = new ListGrid();
    theAppointmentList.addListGridField(new ListGridField("Datum", function (anObject){
        let theNewDate = new Date(anObject.dateString);
        return theNewDate.toLocaleString("de-DE");
    }));
    theAppointmentList.addListGridField(new ListGridField("Titel", anObject => anObject.nameString));


    theAppointmentList.clickEventSelector = appointmentClicked;

    getDatabaseSnapshot("appointments", function(aSnapshot) {
        aSnapshot.forEach(function (aChildSnapshot) {
            theAppointmentList.objects.push(new ListGridAppointmentHelper(aChildSnapshot.key, aChildSnapshot.child("date").val(), aChildSnapshot.child("title").val()));
        });
        let theDiv = document.createElement("div");
        theDiv.innerHTML = theAppointmentList.getHtml();
        contentDiv.appendChild(theDiv);
        hideSpinner();
    });
}

function addNewAppointmentClicked(){
    navigateToViewWithId("newAppointment", false);
}

function appointmentClicked(anIndex){
    let theHelper = theAppointmentList.objects[anIndex];
    setActionId(theHelper.appointmentId);
    navigateToViewWithId("appointment", false);
}

class ListGridAppointmentHelper{

    constructor(anAppointmentId, aDateString, aNameString){
        this.appointmentId = anAppointmentId;
        this.dateString = aDateString;
        this.nameString = aNameString;
    }

}