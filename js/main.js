let isDebugging = false;
let isAlwaysOnline = true;
let jsFiles = [];

function logString(aString) {
    if (isDebugging) {
        console.log(aString);
    }
}

initializeApp();
function initializeApp(){
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js')
            logString("SW registered");
        } catch (error) {
            logString("SW registration failed");
        }
    }
    initializeFirebase();
    include("model/BaseDatabaseObject.js");
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

function showMenu(anArray) {
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

function include(aString) {
    if (!jsFiles.includes(aString)) {
        var theScriptElement = document.createElement('script');
        theScriptElement.src = aString;
        theScriptElement.type = 'text/javascript';
        theScriptElement.defer = true;
        document.getElementsByTagName('head').item(0).appendChild(theScriptElement);
        jsFiles.push(aString);
    }  
}