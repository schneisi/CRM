class InsuranceView extends BaseView {
    initializeView() {
        FbDatabase.getDatabaseSnapshot("/products/" + getActionId(), function (aSnapshot) {
            currentView.insurance = new Insurance(aSnapshot);
            currentView.insurance.loadProviders();
            let thePromise = currentView.insurance.promises[0];
            thePromise.then(function () {
                currentView.showInsurance();
            });
        });
    }

    showInsurance() {
        const theContentDiv = document.getElementById("content");
        let theTable = new StaticList(["30%", "70%"]);
        let theInsurance = currentView.insurance;
        theTable
            .addRow(["Versicherung: ", theInsurance.name()])
            .addRow(["Beschreibung: ", theInsurance.description()])
            .addRow(["Mögliche Anbieter: ", theInsurance.providersAsHtmlList()]);
        theContentDiv.appendChild(theTable.getHtmlElement());
        if (theInsurance.hasLink()) {
            let theButtonLink = document.getElementById("calculatorLink");
            theButtonLink.href = theInsurance.link();
            theButtonLink.style.display = "";
        }
        hideSpinner();
    }
}