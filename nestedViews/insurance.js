include("model/Insurance.js");
let theInsurance;

function initializeReadOnlyInsurance() {
    FbDatabase.getDatabaseSnapshot("/products/" + getActionId(), function (aSnapshot) {
        theInsurance = new Insurance(aSnapshot);
        const theContentDiv = document.getElementById("content");
        let theTable = new StaticList(["30%", "70%"]);

        let theName = theInsurance.name();
        let theDescription = theInsurance.description();
        theTable
            .addRow(["Versicherung: ", theInsurance.name()])
            .addRow(["Beschreibung: ", theInsurance.description()])
            .addRow(["Mögliche Anbieter: ", theInsurance.providersAsHtmlList()]);
        let theTableDiv = document.createElement("div");
        theTableDiv.innerHTML = theTable.getHtml();
        theContentDiv.appendChild(theTableDiv);
        hideSpinner();
    })
    
    
 
    

    
    
}