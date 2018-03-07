var fbDatabase;

function initializeFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDl5p8IaPN9Lc72_IRKEmEQKJLZtObc4TE",
        authDomain: "crm-app-1cdf6.firebaseapp.com",
        databaseURL: "https://crm-app-1cdf6.firebaseio.com",
        projectId: "crm-app-1cdf6",
        storageBucket: "crm-app-1cdf6.appspot.com",
        messagingSenderId: "629201658789"
    };
    firebase.initializeApp(config);
    fbDatabase = firebase.database();
    /*firebase.database.enableLogging(function(message) {
        console.log("[FIREBASE]", message);
    });*/
}