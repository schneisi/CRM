let customerZip;
let customerStreet;
let customerPlace;


function initializeReadOnlyCustomer() {
    getDatabaseSnapshot("/customers/" + getActionId(), function(aSnapshot) {
        const theContentDiv = document.getElementById("content");
        let theTable = new StaticList(["30%", "70%"]);
        customerPlace = aSnapshot.child("address/place").val();
        customerStreet = aSnapshot.child("address/street").val();
        customerZip = aSnapshot.child("address/zip").val();
        theTable
            .addRow(["Name", aSnapshot.child("firstname").val()])
            .addRow(["Vorname", aSnapshot.child("lastname").val()])
            .addRow(["E-Mail", aSnapshot.child("mail").val()])
            .addRow(["Telefon", aSnapshot.child("phone").val()])
            .addRow(["Straße", customerStreet])
            .addRow(["PLZ", customerZip])
            .addRow(["Ort", customerPlace])
            .addRow(["Bemerkung", aSnapshot.child("remark").val()])
        let theTableDiv = document.createElement("div");
        theTableDiv.innerHTML = theTable.getHtml();
        theContentDiv.appendChild(theTableDiv);
    });
}


//Todo get customer destination string
function mapsButtonClicked() {
    callGoogleMaps(customerStreet + " " + customerZip + " " +  customerPlace);
}