document.addEventListener("DOMContentLoaded", function(event) {
    initialize();
});

function initialize() {
    firebase.auth().onAuthStateChanged(aFirebaseUser => {
        if (aFirebaseUser) {
        } else {
            logout();
        }
    });
    
    var theNavigationHammer = new Hammer(document.getElementById("main"));
    theNavigationHammer.on("swiperight swipeleft", aGesture => {
        if (aGesture.type == "swiperight") {
            showDrawer();
        } else {
            dismissDrawer();
        }
    });
}

function logoutClicked() {
    firebase.auth().signOut();
    logout();
}
function logout() {
    sessionStorage.clear();
    redirectToUrl('/index.html');
}