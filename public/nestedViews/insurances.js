class InsurancesView extends BaseView {
    initializeView() {
        const contentDiv = document.getElementById("content");
    
        this.insuranceList = new ListGrid();
        this.insuranceList.showTitle = false;
        this.insuranceList.addListGridField(new ListGridField("Versicherungen", anInsurance => anInsurance.name()));
        this.insuranceList.clickEventSelector = this.insuranceClicked;
        this.insuranceList.groupingMode = ListGridGroupingModes.ALPHABETICAL;

        FSDatabase.getDatabaseSnapshotForCollection("products", aSnapshot => {
            aSnapshot.forEach(aChildSnapshot => {
                let theInsurance = new Insurance(aChildSnapshot);
                this.insuranceList.objects.push(theInsurance);
            });
            contentDiv.appendChild(this.insuranceList.getTableElement());
        }, this, {orderChild: "name"});
    }
    
    insuranceClicked(anInsurance) {
        setActionId(anInsurance.key());
        navigateToViewWithId("insurance");
    }

    searchStringChanged(anEvent) {
        this.insuranceList.search(anEvent.target.value);
    }
}
