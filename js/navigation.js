'use strict';

var sites;
var defaultSite;
var currentView;

let contentContainer;
let theTitleSpan;
let theMenu;

//Initialize
document.addEventListener("DOMContentLoaded", function () {
    //Wait until MDL is initialized
    include("js/View.js");
    setTimeout(function () {
        getAjaxContent("js/sites.json", initializeSites);
    } , 10);
});

function initializeSites(aJsonString) {
    sites = JSON.parse(aJsonString);
    defaultSite = sites.pages[0];
    initializeBody();
}

window.addEventListener('popstate', function (e) {
    let theView = e.state;
    if (theView != null) {
        navigateToView(theView, null, false);
    }
});

function initializeBody() {
    contentContainer = document.getElementById("contentContainer");
    theTitleSpan = document.getElementById("titleSpan");
    theMenu = document.getElementById("menu");

    logString(sites);
    createMenu();
    setTimeout(showStartPage, 250); //Make sure all JS-Files are loaded. Crashes otherwise
}

function createMenu() {
    for (var i = 0; i < sites.pages.length; i++) {
        let theSite = sites.pages[i];
        if (theSite.shownInMenu) {
            let theSpan = document.createElement('span');

            theSpan.setAttribute("id", theSite.id);
            theSpan.classList.add("mdl-navigation__link");
            theSpan.innerHTML = theSite.name;
            theSpan.addEventListener("click", function () {
                navigateToView(theSite, true);
            });
            theMenu.appendChild(theSpan);
        }
        if (theSite.js) {
            include(theSite.js);
        }
    }
}

//Internal
function viewForId(anIdString) {
    for (var i = 0; i < sites.pages.length; i++) {
        let theView = sites.pages[i];
        if (theView.id == anIdString) {
            return theView;
        }
    }
}

async function navigateToViewWithId(anId, aToggleBoolean) {
    let theView = viewForId(anId);
    navigateToView(theView, aToggleBoolean)
}

async function navigateToView(aView, aToggleBoolean, aPushStateBoolean = true) {
    let theUrl = aView.url;
    if (currentView) {
        currentView.unload();
    }
    
    hideMenu();
    hideSaveButton();
    getAjaxContent(theUrl, setContent);
    if (aToggleBoolean && isDrawerExpanded()) {
        var theLayout = document.querySelector('.mdl-layout');
        theLayout.MaterialLayout.toggleDrawer();
    }
    theTitleSpan.innerHTML = aView.name;

    //sessionStorage.setItem('viewTitle', aTitleString);
    sessionStorage.setItem('viewId', aView.id);
    if (aPushStateBoolean) {
        history.pushState(aView, aView.name, null);
    }
}

function setContent(aText) {
    contentContainer.innerHTML = aText;
    componentHandler.upgradeAllRegistered(contentContainer);
    let theView = viewForId(sessionStorage.getItem("viewId"));
    var theScriptElements = contentContainer.getElementsByTagName("script"); 
    currentView = eval("new " + theView.viewClass + "()");
    currentView.initializeView();
    for (var i = 0; i < theScriptElements.length; i++)
    {
        eval(theScriptElements[i].text);
    }
}

function showStartPage() {
    var theViewId = sessionStorage.getItem('viewId');
    let theView;

    if (theViewId) {
        theView = viewForId(theViewId);
    } else {
        theView = defaultSite;
    }
    navigateToView(theView, false);
}

function isDrawerExpanded() {
    let theDrawer = document.getElementsByClassName("mdl-layout__drawer-button")[0];
    var eachIndex;
    for (eachIndex = 0; eachIndex < theDrawer.attributes.length; eachIndex++) {
        let eachAttribute = theDrawer.attributes[eachIndex];
        if (eachAttribute.name == "aria-expanded") {
            return eachAttribute.value == "true";
        }
    }
}

function hasActionId(){
    return sessionStorage.getItem('actionId') != null;
}

function resetActionId() {
    sessionStorage.removeItem('actionId');
}

function getActionId() {
    let theActionId = sessionStorage.getItem('actionId');
    return theActionId;
}

function setActionId(aString) {
    sessionStorage.setItem('actionId', aString);
}
