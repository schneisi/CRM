class ContractView extends BaseView {
    initializeView() {
        showEditMenuButton();
        showDeleteMenuButton();
        FbDatabase.getDatabaseSnapshot(getActionId(), function(aSnapshot) {
            this.contract = new Contract(aSnapshot);
            this.contract.loadInsurance().then(function () {
                this.showContract();
            }.bind(this));
        }, this);
    }

    showContract() {
        this.table = new StaticList(["30%", "70%"]);
        this.table
            .addRow(["Datum", this.contract.dateString()])
            .addRow(["Produkt", this.contract.insuranceName()])
            .addRow(["Bemerkung", this.contract.remark()]);
        let theInsurance = this.contract.insurance;
        if (theInsurance.hasLink()) {
            let theButtonLink = document.getElementById("calculatorLink");
            theButtonLink.href = theInsurance.link();
            theButtonLink.style.display = "";
        }
        document.getElementById("content").appendChild(this.table.getHtmlElement());
    }

    deleteMenuButtonClicked() {
        let theCustomerId = this.contract.customerId();
        this.contract.aboutToDelete();
        setActionId(theCustomerId);
        navigateToViewWithId("customer");
    }

    editMenuButtonClicked() {
        setActionString("contract");
        setActionId("customers/" + this.contract.customerId() + "/contracts/" + this.contract.key())
        navigateToViewWithId("newContract");
    }
}