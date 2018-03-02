include("model/Insurance.js");

class InsuranceView extends BaseView {
    initializeView() {
        FbDatabase.getDatabaseSnapshot("/products/" + getActionId(), function (aSnapshot) {
            currentView.insurance = new Insurance(aSnapshot);
            const theContentDiv = document.getElementById("content");
            let theTable = new StaticList(["30%", "70%"]);
    
            let theName = currentView.insurance.name();
            let theDescription = currentView.insurance.description();
            theTable
                .addRow(["Versicherung: ", currentView.insurance.name()])
                .addRow(["Beschreibung: ", currentView.insurance.description()])
                .addRow(["Mögliche Anbieter: ", currentView.insurance.providersAsHtmlList()]);
            let theTableDiv = document.createElement("div");
            theTableDiv.innerHTML = theTable.getHtml();
            theContentDiv.appendChild(theTableDiv);
            hideSpinner();
        })
    }
}