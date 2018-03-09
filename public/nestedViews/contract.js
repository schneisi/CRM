class ContractView extends BaseView {
    initializeView() {
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
        document.getElementById("content").innerHTML = this.table.getHtml();
    }
}