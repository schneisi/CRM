function initializeDashboard(){
    if(!isOnline()){
        console.log("Test")
        document.getElementById("rssWidget").style.display = "none";
    }
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
