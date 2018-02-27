
function initializeReadOnlyCustomer() {
    console.log("test");
    const theContentDiv = document.getElementById("content");
    let theTable = new StaticList(["30%", "70%"]);
    
    let theFirstName = "Amy";
    let theLastName = "Adams";
    let theGender = "weiblich";
    let theBirthday = "01.2.1997";
    let theStreet = "Doheny Rd. 1";
    let theZip = "72313";
    let thePlace = "Beverly Hills";
    let thePhoneNumber = "012345678910";
    let theMail = "amy@adams.com";
    let theLastAppointment = "05.01.2018";
    let theNotes = "Bekannte Schauspielerin";

    theTable
        .addRow(["Name", theLastName])
        .addRow(["Vorname", theFirstName])
        .addRow(["Geschlecht", theGender])
        .addRow(["Geburtstag", theBirthday])
        .addRow(["Straße", theStreet])
        .addRow(["PLZ", theZip])
        .addRow(["Ort", thePlace])
        .addRow(["Telefon", thePhoneNumber])
        .addRow(["E-Mail", theMail])
        .addRow(["Letzter Termin", theLastAppointment])
        .addRow(["Abgeschlossene Versicherungen", "<ul id='customerContractsList'><li>Berufsunfähigkeitsversicherung</li><li>KFZ Versicherung</li></ul>"]);

    let theTableDiv = document.createElement("div");
    theTableDiv.innerHTML = theTable.getHtml();
    theContentDiv.appendChild(theTableDiv);
}


//Todo get customer destination string
function mapsButtonClicked() {
    callGoogleMaps("Konrad Adenauer Stra�e 34 79540", "Karlsruhe");
}