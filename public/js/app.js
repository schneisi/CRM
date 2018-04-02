Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

document.addEventListener("DOMContentLoaded", function(event) {
    initializeApp();
});



function initializeApp() {
    if (fsDatabase) {
        intialize();
    } else {
        initializeFirebase().then(intialize);
    } 

    //Initialize only if firebase is initialized
    function intialize() {
        if (hasServiceWorker) {
            //Caused by a click on a notification. See serviceWorker.js
            navigator.serviceWorker.addEventListener('message', anEvent => {
                setActionId(anEvent.data.actionId);
                navigateToViewWithId(anEvent.data.viewId);
            });
        }
        initializeNavigation();
        firebase.auth().onAuthStateChanged(aFirebaseUser => {
            if (!aFirebaseUser) {
                logout();
            }
        });
        var theNavigationHammer = new Hammer(document.getElementById("main"));
        theNavigationHammer.on("swiperight",showDrawer);
    }
}

function logoutClicked() {
    firebase.auth().signOut();
    logout();
}

function logout() {
    sessionStorage.clear();
    redirectToUrl('/index.html');
}