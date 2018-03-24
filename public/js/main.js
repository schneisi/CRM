let isDebugging = true;
let isAlwaysOnline = true;
let jsFiles = [];
const applicationServerPublicKey = "BPoW8cpPvtjGUYTU2kBj0OY91inszdxTDAcfrtXn0YoeR7lFSFFH7v45q96X067HwmaaRmvGeNNnIp272mSZGKw";
let serviceWorkerRegistration;
let isSubscribed;
let hasServiceWorker = false;

window.onerror = function (message, url, lineNo){
    if(!isDebugging){
        alert('Error: ' + message + '\n' + 'Line Number: ' + lineNo);
    }
    return false;
};

function logString(aString) {
    if (isDebugging) {
        console.log(aString);
    }
}

initializeApp();
async function initializeApp(){
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js').then(function (aRegistration){
                serviceWorkerRegistration = aRegistration;
                hasServiceWorker = true;
                logString("SW registered");
            });
        } catch (error) {
            logString("SW registration failed");
        }
    }
    initializeFirebase();
    if (Notification && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

function redirectToUrl(aString) {
    window.location.href = aString;
}

function showModal(aTitleString, aMessageString) {
    let theDialog = document.createElement("dialog");
    theDialog.classList.add("mdl-dialog");
    let theHeading = document.createElement("h4");
    theHeading.classList.add("mdl-dialog__title");
    theHeading.innerHTML = aTitleString;
    let theContent = document.createElement("div");
    theContent.classList.add("mdl-dialog__content");
    theContent.innerHTML = aMessageString;
    let theActionGroup = document.createElement("div");
    theActionGroup.classList.add("mdl-dialog__actions");
    let theCloseButton = document.createElement("button");
    theCloseButton.classList.add("mdl-button");
    theCloseButton.addEventListener("click", function() {
        let theDialogToClose = document.querySelector("dialog");
        theDialogToClose.close();
        theDialogToClose.parentNode.removeChild(theDialogToClose);
    });
    theCloseButton.innerHTML = "Schließen";
    theActionGroup.appendChild(theCloseButton);
    theDialog.appendChild(theHeading);
    theDialog.appendChild(theContent);
    theDialog.appendChild(theActionGroup);

    document.body.appendChild(theDialog);
    theDialog.showModal();
}


function saveButton() {
    return document.getElementById("saveButton");
}

function showSaveButton(aCallback) {
    let theButton = saveButton();
    theButton.onclick = aCallback.bind(currentView);
    theButton.style.display = "block";
}

function hideSaveButton() {
    saveButton().style.display = "none";
}

function showSpinner() {
    document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}

function hideMenu() {
    document.getElementById("menuDiv").style.display = "none";
    let theMenuList = document.getElementById("menuList");
    Array.from(theMenuList.children).forEach(function (eachElement) {
        eachElement.style.display = "none";
    });
}

function showMenu() {
    document.getElementById("menuDiv").style.display = "block";
}

function showEditMenuButton() {
    showMenu();
    document.getElementById("editMenuButton").style.display = "block";
}
function showDeleteMenuButton() {
    showMenu();
    document.getElementById("deleteMenuButton").style.display = "block";
}


function callGoogleMaps(destination) {
    var theDestUrl = encodeURI(destination);
    var theMapsUrl = "http://www.google.com/maps/dir/?api=1&destination=" + theDestUrl;
    var theMapsWindow = window.open(theMapsUrl, "_blank");
    theMapsWindow.focus();
}

function isOnline(){
    return navigator.onLine;
}

function include(aString, aCallback) {
    if (!jsFiles.includes(aString)) {
        var theScriptElement = document.createElement('script');
        theScriptElement.src = aString;
        theScriptElement.type = 'text/javascript';
        theScriptElement.defer = true;
        var done = false;
        theScriptElement.onload = theScriptElement.onreadstatechange = function () {
            if ( !done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") ) {
                done = true;
                theScriptElement.onload = theScriptElement.onreadystatechange = null;
                document.head.removeChild(theScriptElement);
                jsFiles.push(aString);
              }
        };
        document.head.appendChild(theScriptElement);
    }  
}


//Notification
function showNotification(aTitle, aMessage, aViewId, anActionId) {
    if (Notification) {
        if (Notification.permission == "granted") {
            if (hasServiceWorker) {
                serviceWorkerNotification(aTitle, aMessage, aViewId, anActionId);
            } else {
                let theNotification = new Notification(aTitle, {
                    body: aMessage  
                  });
                theNotification.onclick = function () {
                    setActionId(anActionId);
                    navigateToViewWithId(aViewId);
                };
            }
        } else {
            Notification.requestPermission(aValue => {
                if (aValue == "granted") {
                    showNotification(aTitle, aMessage, aView, anActionId);
                }
            });
        }
    }
}

function serviceWorkerNotification(aTitleString, aBodyString, aViewId, anActionId) {
    serviceWorkerRegistration.showNotification(aTitleString, {
        body: aBodyString,
        data: {
            viewId: aViewId,
            actionId: anActionId
        }
    });
}

function trimByChar(aString, aCharacter) {
    const theFirstIndex = [...aString].findIndex(eachChar => eachChar !== aCharacter);
    const theLastIndex = [...aString].reverse().findIndex(char => char !== aCharacter);
    return aString.substring(theFirstIndex, aString.length - theLastIndex);
}