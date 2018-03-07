include("model/Customer.js");
include("model/Contract.js");

let theCustomer;

class CustomerView extends BaseView {
    initializeView() {
        showEditMenuButton();
        showDeleteMenuButton();
        this.showCustomerData();
    }
    showCustomerData(){
        FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function(aSnapshot) {
            theCustomer = new Customer(aSnapshot);
            theCustomer.loadContracts(currentView.showContracts);
            currentView.customer = theCustomer;
            const theContentDiv = document.getElementById("content");
            currentView.table = new StaticList(["30%", "70%"]);
            currentView.table
                .addRow(["Name", theCustomer.lastname()])
                .addRow(["Vorname", theCustomer.firstname()])
                .addRow(["Geschlecht", theCustomer.sex()])
                .addRow(["E-Mail", theCustomer.mail()])
                .addRow(["Telefon", theCustomer.phone()])
                .addRow(["Geburtstag", theCustomer.birthdayString()])
                .addRow(["Straße", theCustomer.street()])
                .addRow(["PLZ", theCustomer.zipCode()])
                .addRow(["Ort", theCustomer.place()])
                .addRow(["Bemerkung", aSnapshot.child("notes").val()]);
            currentView.updateName(theCustomer.lastname());
            document.getElementById("customerDataDiv").innerHTML = currentView.table.getHtml();
        });
    }
    showContracts() {
        currentView.contractList = new ListGrid();
        currentView.contractList.addListGridField(new ListGridField("", aContract => aContract.date()));
        currentView.contractList.addListGridField(new ListGridField("", aContract => aContract.productId()));
        currentView.contractList.objects = currentView.customer.contracts;
        document.getElementById("contractListDiv").innerHTML = currentView.contractList.getHtml();

    }

    deleteMenuButtonClicked() {
        this.customer.aboutToDelete();
        navigateToViewWithId("customers");
    }

    editMenuButtonClicked() {
        navigateToViewWithId("newCustomerForm");
    }

    mapsButtonClicked() {
        callGoogleMaps(theCustomer.addressString());
    }
}