firebase.auth().onAuthStateChanged(aFirebaseUser => {
    if (aFirebaseUser) {
    } else {
        logout();
    }
});

function logoutClicked() {
    firebase.auth().signOut();
    logout();
}
function logout() {
    sessionStorage.clear();
    redirectToUrl('/index.html');
}