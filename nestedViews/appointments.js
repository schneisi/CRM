function initializeAppointments() {
    const contentDiv = document.getElementById("content");

    let theList = new ListGrid();
    theList.addListGridField(new ListGridField("Datum", function (anObject){
        let theNewDate = new Date(anObject.dateString);
        return theNewDate.toLocaleString("de-DE");
    }));
    theList.addListGridField(new ListGridField("Titel", anObject => anObject.nameString));


    theList.clickEventSelector = appointmentClicked;

    getDatabaseSnapshot("appointments", function(aSnapshot) {
        aSnapshot.forEach(function (aChildSnapshot) {
            theList.objects.push(new ListGridAppointmentHelper(aChildSnapshot.key, aChildSnapshot.child("date").val(), aChildSnapshot.child("title").val()));
        });
        let theDiv = document.createElement("div");
        theDiv.innerHTML = theList.getHtml();
        contentDiv.appendChild(theDiv);
        hideSpinner();
    });
}

function addNewAppointmentClicked(){
    navigateToViewWithId("newAppointment", false);
}

function appointmentClicked(){
    navigateToViewWithId("appointment", false);
}

class ListGridAppointmentHelper{

    constructor(anAppointmentId, aDateString, aNameString){
        this.appointmentId = anAppointmentId;
        this.dateString = aDateString;
        this.nameString = aNameString;
    }

}