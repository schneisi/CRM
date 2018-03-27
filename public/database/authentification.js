var fsDatabase;

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
    let thePromise = new Promise(function(resolve, reject) {
        firebase.initializeApp(config);
        firebase.firestore().enablePersistence()
            .then(function() {
                // Initialize Cloud Firestore through firebase
                fsDatabase = firebase.firestore();
                resolve(fsDatabase);
            })
            .catch(anError => {
                logError(anError);
                if (anError.code == 'failed-precondition') {
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                    // ...
                } else if (anError.code == 'unimplemented') {
                    // The current browser does not support all of the
                    // features required to enable persistence
                    // ...
                }
                reject(anError);
            })
    });
    return thePromise;
}