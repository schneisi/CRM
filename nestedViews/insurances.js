let theList;

function initializeInsurances() {
    //TODO: Not Correct. Has to be the content-div, not the container
    

    const contentDiv = document.getElementById("contentContainer");

    theList = new ListGrid();
    theList.addListGridField(new ListGridField("Versicherungen", aListGridHelper => aListGridHelper.value));
    theList.clickEventSelector = customerClicked;
    theList.clickEventSelector = insuranceClicked;
       getDatabaseSnapshot("products", function (aSnapshot) {
           aSnapshot.forEach(function (aChildSnapshot) {
               theList.objects.push(new ListGridHelper(aChildSnapshot.key, aChildSnapshot.child("name").val()));
           });
           let theDiv = document.createElement("div");

           theDiv.innerHTML = theList.getHtml();
           contentDiv.appendChild(theDiv);
        });
    

}

function insuranceClicked(anIndex) {
    let theHelper = theList.objects[anIndex];
    setActionId(theHelper.object);
    navigateToViewWithId("insurance", false);
    //let theHelper = theList.objects[anIndex];
    //console.log(theHelper.value)
}