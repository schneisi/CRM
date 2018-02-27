
function writeInDatabase(aPath, aJSONData){
    let theKey = fbDatabase.ref().child(aPath).push().key;
    let theDictionary = {};
    theDictionary[aPath + "/" + theKey] = aJSONData;
    fbDatabase.ref().update(theDictionary);
}