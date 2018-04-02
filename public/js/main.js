const isDebugging = false;
const showErrorMessage = false;

let jsFiles = [];
let serviceWorkerRegistration;
let hasServiceWorker = false;

window.onerror = function (message, url, lineNo){
    if(!isDebugging && showErrorMessage){
        showModal('Error: ' + message + '\n' + 'Line Number: ' + lineNo);
    }
    return false;
};

function logString(aString) {
    if (isDebugging) {
        console.log(aString);
    }
}
function logError(aString) {
    console.log("ERROR: " + aString);
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
            logError("SW registration failed");
        }
    }
    if (Notification && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

function redirectToUrl(aString) {
    window.location.href = aString;
}

function showModal(aTitleString, aMessageString) {
    //Does only work in Chrome
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
    Array.from(theMenuList.children).forEach(eachElement => {
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
    var theMapsUrl = "http://www.google.com/maps/dir/?api=1&destination=" + encodeURI(destination);
    var theMapsWindow = window.open(theMapsUrl, "_blank");
    theMapsWindow.focus();
}

function isOnline(){
    return navigator.onLine;
}

function include(aString, aCallback) {
    //Function to include additional js-files
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
                //Show notification via service worker
                serviceWorkerRegistration.showNotification(aTitle, {
                    body: aMessage,
                    data: {
                        viewId: aViewId,
                        url: window.location.href,
                        actionId: anActionId
                    }
                });
            } else {
                //Show classic Browser notification
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
                    //Recursive call if permission now granted
                    showNotification(aTitle, aMessage, aView, anActionId);
                }
            });
        }
    }
}