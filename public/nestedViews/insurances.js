class InsurancesView extends BaseView {
    initializeView() {
        const contentDiv = document.getElementById("content");
    
        this.insuranceList = new ListGrid();
        this.insuranceList.showTitle = false;
        this.insuranceList.addListGridField(new ListGridField("Versicherungen", aListGridHelper => aListGridHelper.value));
        this.insuranceList.clickEventSelector = this.insuranceClicked;
        this.insuranceList.groupingMode = ListGridGroupingModes.ALPHABETICAL;

        FbDatabase.getDatabaseSnapshot("products", function (aSnapshot) {
            aSnapshot.forEach(function (aChildSnapshot) {
                currentView.insuranceList.objects.push(new ListGridHelper(aChildSnapshot.key, aChildSnapshot.child("name").val()));
            });
            contentDiv.appendChild(this.insuranceList.getTableElement());
        }, this, {orderChild: "name"});
    }
    
    insuranceClicked(aHelper) {
        setActionId(aHelper.object);
        navigateToViewWithId("insurance");
    }

    searchStringChanged(anEvent) {
        this.insuranceList.search(anEvent.target.value);
    }
}
