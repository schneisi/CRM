class InsurancesView extends BaseView {
    initializeView() {
        const contentDiv = document.getElementById("content");
    
        this.insuranceList = new ListGrid();
        this.insuranceList.showTitle = false;
        this.insuranceList.addListGridField(new ListGridField("Versicherungen", aListGridHelper => aListGridHelper.value));
        this.insuranceList.clickEventSelector = this.insuranceClicked;
        FbDatabase.getDatabaseSnapshot("products", function (aSnapshot) {
            aSnapshot.forEach(function (aChildSnapshot) {
                currentView.insuranceList.objects.push(new ListGridHelper(aChildSnapshot.key, aChildSnapshot.child("name").val()));
            });
            contentDiv.appendChild(this.insuranceList.getTableElement());
        }, this);
    }
    
    insuranceClicked(aHelper) {
        setActionId(aHelper.object);
        navigateToViewWithId("insurance");
    }
}
