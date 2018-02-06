function initializeCustomers() {
    //TODO: Not Correct. Has to be the content-div, not the container
    const contentDiv = document.getElementById("contentContainer");

    let theList = new ListGrid();
    theList.addListGridField(new ListGridField("Titel", function(anObject) {
        return anObject.value;
    }))
    theList.objects.push(new ListGridHelper("Test", "Wert"));
    let theDiv = document.createElement("div");
    theDiv.innerHTML = theList.getHtml();
    contentDiv.appendChild(theDiv);
}

function addNewCustomerClicked(){
    navigateToSiteWithId("newCustomerForm", false);
}