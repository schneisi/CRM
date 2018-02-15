'use strict';
var sites = JSON.parse('{' + 
    '"pages": ['+
        '{' + 
            '"name": "Dashboard",' + 
            '"id": "dashboard",' + 
            '"url": "./nestedViews/dashboard.html",' +
            '"shownInMenu": true' +
        '},' +
        '{' + 
            '"name": "Kunden",' + 
            '"id": "customers",' + 
            '"url": "./nestedViews/customers.html",' +
            '"js": "initializeCustomers();",' +
            '"shownInMenu": true' +
        '},' +
        '{' + 
            '"name": "Demo-Form",' + 
            '"id": "exampleForm",' + 
            '"url": "./nestedViews/demoForm.html",' +
            '"shownInMenu": true' +
        '},' +
        '{' +
            '"name": "Kunde anlegen",' +
            '"id": "newCustomerForm",' +
            '"url": "./nestedViews/newCustomer.html",' +
            '"shownInMenu": false' +
         '},' +
        '{' + 
            '"name": "Demo-Table",' + 
            '"id": "exampleTable",' + 
            '"url": "./nestedViews/demoTable.html",' +
            '"shownInMenu": true' +
        '},' +
        '{' + 
            '"name": "insurance",' + 
            '"id": "insurance",' + 
            '"url": "./nestedViews/insurance.html",' +
            '"shownInMenu": false' +
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
    
    logString(sites);
    createMenu();
    showStartPage();
}

function createMenu() {
    for (var i = 0; i < sites.pages.length; i++) {
        let theSite = sites.pages[i];
        if (theSite.shownInMenu){
            let theSpan = document.createElement('span');

            theSpan.setAttribute("id", theSite.id);
            theSpan.classList.add("mdl-navigation__link");
            theSpan.innerHTML = theSite.name;
            theSpan.addEventListener("click", function () {
                navigateToView(theSite, true);
            });
            menu.appendChild(theSpan); 
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

async function navigateToViewWithId(anId, aToggleBoolean){
    let theView = viewForId(anId);
    navigateToView(theView, aToggleBoolean)
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
    if (theView && theView.js) {
        eval(theView.js); //Needs to be tested
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
