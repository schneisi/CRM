'use strict';
include("js/View.js");

var sites;
var defaultSite;
var currentView;

let contentContainer;
let titleSpan;
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
    let theHistoryView = e.state;
    if (theHistoryView != null) {
        if (theHistoryView.actionId) {
            setActionId(theHistoryView.actionId);
        }
        navigateToView(theHistoryView.jsonView, null);
    }
});

function initializeBody() {
    contentContainer = document.getElementById("contentContainer");
    titleSpan = document.getElementById("titleSpan");
    theMenu = document.getElementById("menu");

    logString(sites);
    createMenu();
    setTimeout(showStartPage, 250); //Make sure all JS-Files are loaded. Crashes otherwise
}

function createMenu() {
    sites.pages.forEach( eachSite => {
        if (eachSite.shownInMenu) {
            let theSpan = document.createElement('span');

            theSpan.setAttribute("id", eachSite.id);
            theSpan.classList.add("mdl-navigation__link");
            theSpan.innerHTML = eachSite.name;
            theSpan.addEventListener("click", function () {
                navigateToView(eachSite);
            });
            theMenu.appendChild(theSpan);
        }
        if (eachSite.js) {
            include(eachSite.js);
        }
    });
}

//Internal
function viewForId(anIdString) {
    let theSite;
    sites.pages.forEach(eachSite => {
        if (eachSite.id == anIdString) {
            theSite = eachSite;
            return;
        }
    });
    return theSite;
}

async function navigateToViewWithId(anId) {
    let theView = viewForId(anId);
    navigateToView(theView)
}

async function navigateToView(aJsonView, aPushStateBoolean = true) {
    let theUrl = aJsonView.url;
    if (currentView) {
        currentView.unload();
    }
    titleSpan.innerHTML = aJsonView.name;
    hideMenu();
    hideSaveButton();
    getAjaxContent(theUrl, setContent);
    if (isDrawerExpanded()) {
        var theLayout = document.querySelector('.mdl-layout');
        theLayout.MaterialLayout.toggleDrawer();
    }

    sessionStorage.setItem('viewId', aJsonView.id);
    if (aPushStateBoolean) {
        history.pushState(new HistoryObject(aJsonView, getActionId()), aJsonView.name, null);
    }
}

function setContent(aText) {
    contentContainer.innerHTML = aText;
    componentHandler.upgradeAllRegistered(contentContainer);
    let theView = viewForId(sessionStorage.getItem("viewId"));
    var theScriptElements = contentContainer.getElementsByTagName("script"); 
    currentView = eval("new " + theView.viewClass + "()");
    currentView.initializeView();
    if (currentView.name) {
        titleSpan.innerHTML = currentView.name;
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
    navigateToView(theView);
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
