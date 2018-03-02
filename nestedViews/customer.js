include("model/Customer.js");

let theCustomer;

class CustomerView {
    initializeView() {
        showDeleteMenuButton();
        FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function(aSnapshot) {
            theCustomer = new Customer(aSnapshot);
            const theContentDiv = document.getElementById("content");
            currentView.table = new StaticList(["30%", "70%"]);
            currentView.table
                .addRow(["Name", theCustomer.firstname()])
                .addRow(["Vorname", theCustomer.lastname()])
                .addRow(["E-Mail", theCustomer.mail()])
                .addRow(["Telefon", theCustomer.phone()])
                .addRow(["Straße", theCustomer.street()])
                .addRow(["PLZ", theCustomer.zipCode()])
                .addRow(["Ort", theCustomer.place()])
                .addRow(["Bemerkung", aSnapshot.child("remark").val()]);
            let theTableDiv = document.createElement("div");
            theTableDiv.innerHTML = currentView.table.getHtml();
            theContentDiv.appendChild(theTableDiv);
        });
    }
    
    deleteMenuButtonClicked() {
        console.log("delete");
    }
    //Todo get customer destination string
    mapsButtonClicked() {
        callGoogleMaps(theCustomer.addressString());
    }
}