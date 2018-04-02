class InsuranceView extends BaseView {
    initializeView() {
        FSDatabase.getDatabaseSnapshotForDoc("/products/" + getActionId(), aSnapshot => {
            this.insurance = new Insurance(aSnapshot);
            this.showInsurance();
        }, this);
    }

    showInsurance() {
        const theContentDiv = document.getElementById("content");
        let theTable = new StaticList();
        let theInsurance = this.insurance;
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