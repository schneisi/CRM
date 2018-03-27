class InsuranceView extends BaseView {
    initializeView() {
        FSDatabase.getDatabaseSnapshotForDoc("/products/" + getActionId(), function (aSnapshot) {
            currentView.insurance = new Insurance(aSnapshot);
            currentView.showInsurance();
        });
    }

    showInsurance() {
        const theContentDiv = document.getElementById("content");
        let theTable = new StaticList(["30%", "70%"]);
        let theInsurance = currentView.insurance;
        theTable
            .addRow(["Versicherung: ", theInsurance.name()])
            .addRow(["Beschreibung: ", theInsurance.description()])
        theContentDiv.appendChild(theTable.getHtmlElement());
        if (theInsurance.hasLink()) {
            let theButtonLink = document.getElementById("calculatorLink");
            theButtonLink.href = theInsurance.link();
            theButtonLink.style.display = "";
        }
        hideSpinner();
    }
}