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
            let theDiv = document.createElement("div");
    
            theDiv.innerHTML = this.insuranceList.getHtml();
            contentDiv.appendChild(theDiv);
        }, this);
    }
    
    insuranceClicked(anIndex) {
        let theHelper = this.insuranceList.objects[anIndex];
        setActionId(theHelper.object);
        navigateToViewWithId("insurance");
    }
}
