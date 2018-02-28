let appointmentZip;
let appointmentStreet;
let appointmentPlace;

function initializeReadOnlyAppointment(){
    FbDatabase.getDatabaseSnapshot("/appointments/" + getActionId(), function(aSnapshot) {
        const theContentDiv = document.getElementById("content");
        let theTable = new StaticList(["30%", "70%"]);
        appointmentPlace = aSnapshot.child("address/place").val();
        appointmentStreet = aSnapshot.child("address/street").val();
        appointmentZip = aSnapshot.child("address/zip").val();

        theTable
            .addRow(["Titel:", aSnapshot.child("title").val()])
            .addRow(["Kunde:", aSnapshot.child("customer").val()])
            .addRow(["Datum:", aSnapshot.child("date").val()])
            .addRow(["Strasse:", appointmentStreet])
            .addRow(["PLZ:", appointmentZip])
            .addRow(["Ort:", appointmentPlace])
            .addRow(["Notizen:", aSnapshot.child("notes").val()]);

        let theTableDiv = document.createElement("div");
        theTableDiv.innerHTML = theTable.getHtml();
        theContentDiv.appendChild(theTableDiv);
    });
}