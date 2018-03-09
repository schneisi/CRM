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
            this.customerList.objects = theCustomers;
            let theDiv = document.createElement("div");
            theDiv.innerHTML = this.customerList.getHtml();
            contentDiv.appendChild(theDiv);
            hideSpinner();
        };
        let theOptions = {
            orderChild: "lastname"
        }
        FbDatabase.getDatabaseSnapshot("customers", theCallback, this, theOptions);
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