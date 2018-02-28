include('model/Customer.js');
let theCustomersList;

function initializeCustomers() {
    const contentDiv = document.getElementById("content");

    theCustomersList = new ListGrid();
    theCustomersList.showTitle = false;
    theCustomersList.addListGridField(new ListGridField("Titel", anObject => anObject.value));
    theCustomersList.clickEventSelector = customerClicked;

    let theCallback = function(aSnapshot) {
        BaseDatabaseObject.createObjectsFromSnapshot(aSnapshot, Customer, function(aList) {
            aList.forEach(function (eachCustomer) {
                theCustomersList.objects.push(new ListGridHelper(eachCustomer.key(), eachCustomer.fullName()));
            });
            let theDiv = document.createElement("div");
            theDiv.innerHTML = theCustomersList.getHtml();
            contentDiv.appendChild(theDiv);
            hideSpinner();
        });
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