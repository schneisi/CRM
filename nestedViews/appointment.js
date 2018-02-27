function initializeReadOnlyAppointment(){
    const theContentDiv = document.getElementById("content");
    let theTable = new StaticList(["30%", "70%"]);
    
    let theTitle = "Krankenversicherung";
    let theAdress = "Konrad-Adenauer-Strasse 34";
    let theCustomer = "Niklas Huber";
    let theDay = "28.02.2018";
    let theTime = "09:30";

    theTable
        .addRow(["Titel", theTitle])
        .addRow(["Adresse", theAdress])
        .addRow(["Kunde", theCustomer])
        .addRow(["Datum", theDay])
        .addRow(["Uhrzeit", theTime]);

    let theTableDiv = document.createElement("div");
    theTableDiv.innerHTML = theTable.getHtml();
    theContentDiv.appendChild(theTableDiv);
}