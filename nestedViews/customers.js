let theList;

function initializeCustomers() {
    const contentDiv = document.getElementById("content");

    theList = new ListGrid();
    theList.showTitle = false;
    theList.addListGridField(new ListGridField("Titel", anObject => anObject.value));
    theList.clickEventSelector = customerClicked;

    getDatabaseSnapshot("customers", function(aSnapshot) {
        aSnapshot.forEach(function (aChildSnapshot) {
            theList.objects.push(new ListGridHelper(aChildSnapshot.key, aChildSnapshot.child("lastname").val()));
        });
        let theDiv = document.createElement("div");
        theDiv.innerHTML = theList.getHtml();
        contentDiv.appendChild(theDiv);
        hideSpinner();
    });
}

function addNewCustomerClicked(){
    navigateToViewWithId("newCustomerForm", false);
}

function customerClicked(anIndex){
    let theKey = theList.objects[anIndex].object;
    setActionId(theKey);
    navigateToViewWithId("customer", false);
}