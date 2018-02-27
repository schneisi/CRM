
function writeUserData(anId, aUsername, aMailString){
    database.ref("users/" + anId).set({
        username: aUsername,
        email: aMailString
    });
}

function writeInDatabase(aPath, anId, aJSONData){

    let theNewKey = database.ref().child(aPath).push().key;
    let theDictionary = {};
    theDictionary[aPath + "/" + theNewKey] = aJSONData;
    database.ref().update(theDictionary);
}