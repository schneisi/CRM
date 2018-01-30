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
            '"url": "./nestedViews/customers.html"' +
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
    , 50);
}); 

window.addEventListener('popstate', function(e) {
    let url = e.state;
    if (url != null) {
        navigateToUrl("TEST", url, null, false);
    }
});




const defaultSite = './nestedViews/dashboard.html';

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
            navigateToUrl(theSite.name, theSite.url, true);
        })
        menu.appendChild(theSpan);
    }

}


//Internal
async function navigateToUrl(aTitleString, anUrlString, aToggleBoolean, aPushStateBoolean = true) {
    getAjaxContent(anUrlString, setContent);
    if (aToggleBoolean) {
        var layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
    }
    titleSpan.innerHTML = aTitleString;

    sessionStorage.setItem('viewTitle', aTitleString);
    sessionStorage.setItem('view', anUrlString);
    if (aPushStateBoolean) {
        history.pushState(anUrlString, aTitleString, null);
    }
    
}

function setContent(aText) {
    contentContainer.innerHTML = aText;
    componentHandler.upgradeAllRegistered(contentContainer);
}

function showStartPage() {
    const theUrlString = sessionStorage.getItem('view');
    let theUrl;
    let theTitleString;

    if (theUrlString) {
        theUrl = theUrlString;
        theTitleString = sessionStorage.getItem('viewTitle');
    } else {
        theUrl = defaultSite;
        theTitleString = "CRM";
    }
    navigateToUrl(theTitleString, theUrl, false);
}
