let userId = sessionStorage.getItem('userId');
//console.log("UserID:" + userId);
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