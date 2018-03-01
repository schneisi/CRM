include('model/Customer.js');
let theCustomersList;

function initializeCustomers() {
    const contentDiv = document.getElementById("content");

    theCustomersList = new ListGrid();
    theCustomersList.showTitle = false;
    theCustomersList.addListGridField(new ListGridField("Name", anObject => anObject.tableName()));
    theCustomersList.clickEventSelector = customerClicked;

    let theCallback = function(aSnapshot) {
        let theCustomers = BaseDatabaseObject.createObjectsFromSnapshot(aSnapshot, Customer);
        theCustomersList.objects = theCustomers;
        let theDiv = document.createElement("div");
        theDiv.innerHTML = theCustomersList.getHtml();
        contentDiv.appendChild(theDiv);
        hideSpinner();
    };
    FbDatabase.getDatabaseSnapshot("customers", theCallback, "lastname", null, null);
}

function addNewCustomerClicked(){
    navigateToViewWithId("newCustomerForm", false);
}

function customerClicked(anIndex){
    let theKey = theCustomersList.objects[anIndex].object;
    setActionId(theKey);
    navigateToViewWithId("customer", false);
}