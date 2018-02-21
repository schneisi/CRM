let isDebugging = false;
let isAlwaysOnline = true;

function logString(aString) {
    if (isDebugging) {
        console.log(aString);
    }
}



if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('serviceWorker.js')
        logString("SW registered");
    } catch (error) {
        logString("SW registration failed");
    }
}


function logout() {
    sessionStorage.clear();
    redirectToUrl('/index.html');
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
    })
    theCloseButton.innerHTML = "Schließen";
    theActionGroup.appendChild(theCloseButton);
    theDialog.appendChild(theHeading);
    theDialog.appendChild(theContent);
    theDialog.appendChild(theActionGroup);

    contentContainer.appendChild(theDialog);
    theDialog.showModal();
}


function saveButton() {
    return document.getElementById("saveButton")
}

function showSaveButton(aCallback) {
    let theButton = saveButton();
    theButton.onclick = aCallback;
    theButton.style.display = "block";
}

function hideSaveButton() {
    saveButton().style.display = "none";
}
function callGoogleMaps(origin, destination) {
    var destUrl = encodeURI(destination);
    var mapsUrl = "http://www.google.com/maps/dir/?api=1&destination=" + destUrl;
    var mapsWindow = window.open(mapsUrl, "_blank");
    mapsWindow.focus();
}

function isOnline(){
    return navigator.onLine;
}