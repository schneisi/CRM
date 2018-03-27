class CustomersView extends BaseView {
    initializeView() {
        const contentDiv = document.getElementById("content");
    
        this.customerList = new ListGrid();
        this.customerList.showTitle = false;
        this.customerList.addListGridField(new ListGridField("Name", anObject => anObject.tableName()));
        this.customerList.clickEventSelector = this.customerClicked;
        this.customerList.deleteSelector = this.customerDeleteClicked;
        this.customerList.groupingMode = ListGridGroupingModes.ALPHABETICAL;
    
        let theCallback = function(aSnapshot) {
            let theCustomers = BaseDatabaseObject.createObjectsFromSnapshot(aSnapshot, Customer);
            this.customerList.objects = theCustomers;
            let theDiv = document.createElement("div");
            theDiv.appendChild(this.customerList.getTableElement());
            contentDiv.appendChild(theDiv);
            hideSpinner();
        };
        let theOptions = {
            orderChild: "lastname"
        }
        FSDatabase.getDatabaseSnapshotForCollection("customers", theCallback, this, theOptions);
    }
    
    addNewCustomerClicked() {
        resetActionId();
        navigateToViewWithId("newCustomerForm");
    }
    
    customerClicked(aCustomer){
        setActionId(aCustomer.key());
        navigateToViewWithId("customer");
    }

    customerDeleteClicked(aCustomer) {
        aCustomer.aboutToDelete();
        return true;
    }

    searchStringChanged(anEvent) {
        this.customerList.search(anEvent.target.value);
    }
}