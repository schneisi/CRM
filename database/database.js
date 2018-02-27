//API
function writeInDatabase(aPath, aJSONData){
    let theKey = fbDatabase.ref().child(aPath).push().key;
    let theDictionary = {};
    theDictionary[aPath + "/" + theKey] = aJSONData;
    fbDatabase.ref().update(theDictionary);
}


function getDatabaseSnapshot(aPath, aCallback) {
    var ref = fbDatabase.ref(aPath).once('value').then(function(aSnapshot) {
        aCallback(aSnapshot);
    });
}


//Example
function snapshot() {
    getDatabaseSnapshot("products", function(aSnapshot) {
        aSnapshot.forEach(function (aChildSnapshot) {
            console.log(aChildSnapshot.child("name").val());
        })
    });
}