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