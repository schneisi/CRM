include("model/Customer.js");

let theCustomer;


function initializeReadOnlyCustomer() {
    FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function(aSnapshot) {
        theCustomer = new Customer(aSnapshot);
        const theContentDiv = document.getElementById("content");
        let theTable = new StaticList(["30%", "70%"]);
        theTable
            .addRow(["Name", theCustomer.firstname()])
            .addRow(["Vorname", theCustomer.lastname()])
            .addRow(["E-Mail", theCustomer.mail()])
            .addRow(["Telefon", theCustomer.phone()])
            .addRow(["Straße", theCustomer.street()])
            .addRow(["PLZ", theCustomer.zipCode()])
            .addRow(["Ort", theCustomer.place()])
            .addRow(["Bemerkung", aSnapshot.child("remark").val()]);
        let theTableDiv = document.createElement("div");
        theTableDiv.innerHTML = theTable.getHtml();
        theContentDiv.appendChild(theTableDiv);


        //Suggestions
    });
}


//Todo get customer destination string
function mapsButtonClicked() {
    callGoogleMaps(theCustomer.addressString());
}