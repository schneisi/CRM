include("model/Customer.js");
include("model/Contract.js");

let theCustomer;

class CustomerView extends BaseView {
    initializeView() {
        showEditMenuButton();
        showDeleteMenuButton();
        FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function(aSnapshot) {
            theCustomer = new Customer(aSnapshot);
            theCustomer.loadContracts();
            currentView.customer = theCustomer;
            const theContentDiv = document.getElementById("content");
            currentView.table = new StaticList(["30%", "70%"]);
            currentView.table
                .addRow(["Name", theCustomer.lastname()])
                .addRow(["Vorname", theCustomer.firstname()])
                .addRow(["E-Mail", theCustomer.mail()])
                .addRow(["Telefon", theCustomer.phone()])
                .addRow(["Geburtstag", theCustomer.birthdayString()])
                .addRow(["Straße", theCustomer.street()])
                .addRow(["PLZ", theCustomer.zipCode()])
                .addRow(["Ort", theCustomer.place()])
                .addRow(["Bemerkung", aSnapshot.child("remark").val()]);
            currentView.updateName(theCustomer.lastname());
            let theTableDiv = document.createElement("div");
            theTableDiv.innerHTML = currentView.table.getHtml();
            theContentDiv.appendChild(theTableDiv);
        });
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