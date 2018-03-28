document.addEventListener("DOMContentLoaded", function(event) {
    initializeApp();
});

navigator.serviceWorker.addEventListener('message', anEvent => {
    setActionId(anEvent.data.actionId);
    navigateToViewWithId(anEvent.data.viewId);
});

function initializeApp() {
    if (fsDatabase) {
        intialize();
    } else {
        initializeFirebase().then(intialize);
    } 

    function intialize() {
        initializeNavigation();
        firebase.auth().onAuthStateChanged(aFirebaseUser => {
            if (aFirebaseUser) {
            } else {
                logout();
            }
        });
    }
    
    var theNavigationHammer = new Hammer(document.getElementById("main"));
    theNavigationHammer.on("swiperight", function () {showDrawer()});
}

function logoutClicked() {
    firebase.auth().signOut();
    logout();
}
function logout() {
    sessionStorage.clear();
    redirectToUrl('/index.html');
}