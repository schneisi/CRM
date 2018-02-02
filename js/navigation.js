'use strict';
var sites = JSON.parse('{' + 
    '"pages": ['+
        '{' + 
            '"name": "Dashboard",' + 
            '"id": "dashboardLink",' + 
            '"url": "./nestedViews/dashboard.html"' +
        '},' +
        '{' + 
            '"name": "Kunden",' + 
            '"id": "customerLink",' + 
            '"url": "./nestedViews/customers.html",' +
            '"js": "initializeCustomers();"' +
        '},' +
        '{' + 
            '"name": "Demo-Form",' + 
            '"id": "exampleForm",' + 
            '"url": "./nestedViews/demoForm.html"' +
        '},' +
        '{' + 
            '"name": "Demo-Table",' + 
            '"id": "exampleTable",' + 
            '"url": "./nestedViews/demoTable.html"' +
        '}' +
    ']}');

//Initialize
document.addEventListener("DOMContentLoaded", function () {
    //Wait until MDL is initialized
    setTimeout(function () {
        initialize();
    }
    , 10);
}); 

window.addEventListener('popstate', function(e) {
    let theView = e.state;
    if (theView != null) {
        navigateToView(theView, null, false);
    }
});


const defaultSite = sites.pages[0];

function initialize() {
    const contentContainer = document.getElementById("contentContainer");
    const titleSpan = document.getElementById("titleSpan");
    const menu = document.getElementById("menu");
    
    console.log(sites);
    createMenu();
    showStartPage();
}

function createMenu() {
    for (var i = 0; i < sites.pages.length; i++) {
        let theSpan = document.createElement('span');
        let theSite = sites.pages[i];
        theSpan.setAttribute("id", theSite.id);
        theSpan.classList.add("mdl-navigation__link");
        theSpan.innerHTML = theSite.name;
        theSpan.addEventListener("click", function() {
            navigateToView(theSite, true);
        });
        menu.appendChild(theSpan);
    }

}

//Internal
function viewForId(anIdString) {
    for (var i = 0; i < sites.pages.length; i++) {
        let theSite = sites.pages[i];
        if (theSite.id == anIdString) {
            return theSite;
        } 
    } 
}

async function navigateToSiteWithId(anId, aToggleBoolean){
    let theSite = viewForId(anId);
    navigateToView(theSite, aToggleBoolean)
}

async function navigateToView(aView, aToggleBoolean, aPushStateBoolean = true) {
    let theUrl = aView.url;
    getAjaxContent(theUrl, setContent);
    if (aToggleBoolean) {
        var layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
    }
    titleSpan.innerHTML = aView.name;

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
    if (theView.js) {
        eval(theView.js);
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
