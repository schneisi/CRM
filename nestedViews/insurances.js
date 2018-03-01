let theInsuranceList;

function initializeInsurances() {
    const contentDiv = document.getElementById("content");

    theInsuranceList = new ListGrid();
    theInsuranceList.showTitle = false;
    theInsuranceList.addListGridField(new ListGridField("Versicherungen", aListGridHelper => aListGridHelper.value));
    theInsuranceList.clickEventSelector = insuranceClicked;
    getDatabaseSnapshot("products", function (aSnapshot) {
        aSnapshot.forEach(function (aChildSnapshot) {
            theInsuranceList.objects.push(new ListGridHelper(aChildSnapshot.key, aChildSnapshot.child("name").val()));
        });
        let theDiv = document.createElement("div");

        theDiv.innerHTML = theInsuranceList.getHtml();
        contentDiv.appendChild(theDiv);
    });
}

function insuranceClicked(anIndex) {
    let theHelper = theInsuranceList.objects[anIndex];
    setActionId(theHelper.object);
    navigateToViewWithId("insurance", false);
}