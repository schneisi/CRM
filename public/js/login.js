initializeLogin();

function initializeLogin() {
    if (fsDatabase) {
        setAuthStatusListener();
    } else {
        initializeFirebase().then(setAuthStatusListener);
    }

    function setAuthStatusListener() {
        firebase.auth().onAuthStateChanged(aFirebaseUser => {
            if (aFirebaseUser) {
                redirect();
            }
        })
    } 
}

function redirect() {
    redirectToUrl('/crm.html');
}