include('model/Customer.js');

class CustomersView extends BaseView {
    initializeView() {
        const contentDiv = document.getElementById("content");
    
        this.customerList = new ListGrid();
        this.customerList.showTitle = false;
        this.customerList.addListGridField(new ListGridField("Name", anObject => anObject.tableName()));
        this.customerList.clickEventSelector = this.customerClicked;
    
        let theCallback = function(aSnapshot) {
            let theCustomers = BaseDatabaseObject.createObjectsFromSnapshot(aSnapshot, Customer);
            currentView.customerList.objects = theCustomers;
            let theDiv = document.createElement("div");
            theDiv.innerHTML = currentView.customerList.getHtml();
            contentDiv.appendChild(theDiv);
            hideSpinner();
        };
        FbDatabase.getDatabaseSnapshot("customers", theCallback, "lastname", null, null);
    }
    
    addNewCustomerClicked() {
        resetActionId();
        navigateToViewWithId("newCustomerForm");
    }
    
    customerClicked(anIndex){
        let theCustomer = this.customerList.objects[anIndex];
        setActionId(theCustomer.key());
        navigateToViewWithId("customer");
    }
}