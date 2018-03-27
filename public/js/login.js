let userId = sessionStorage.getItem('userId');
if (userId != null) {
    redirect();
}

function login() {
    sessionStorage.setItem('userId', 1);
    redirect();
}

function redirect() {
    redirectToUrl('/crm.html');
}

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