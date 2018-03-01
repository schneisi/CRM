//API
class FbDatabase {
    static writeInDatabase(aPath, aKey, aJSONData){
        let theKey
        if (aKey) {
            theKey = aKey;
        } else {
            theKey = fbDatabase.ref().child(aPath).push().key;
        }
        let theDictionary = {};
        theDictionary[aPath + "/" + theKey] = aJSONData;
        fbDatabase.ref().update(theDictionary);
    }

    static getDatabaseSnapshot(aPath, aCallback, anOrderString, aStartObject, anEndObject, aLimitNumber = 100) {
        let theFunction = aSnapshot => aCallback(aSnapshot);
        let theReference = fbDatabase.ref(aPath);
        if (anOrderString) {
            if (anEndObject) {
                theReference.orderByChild(anOrderString).startAt(aStartObject).endAt(anEndObject).limitToFirst(aLimitNumber).once('value').then(theFunction);
            } else {
                theReference.orderByChild(anOrderString).startAt(aStartObject).limitToFirst(aLimitNumber).once('value').then(theFunction);
            }
        } else {
            theReference.once('value').then(theFunction);
        }
    }

    static valueForDate(aDate) {
        return aDate.getTime();
    }

    static dateForValue(aNumber) {
        var theDate = new Date();
        theDate.setTime(aNumber);
        return theDate;
    }
}


//Example
function snapshot() {
    FbDatabase.getDatabaseSnapshot("products", function(aSnapshot) {
        aSnapshot.forEach(function (aChildSnapshot) {
            console.log(aChildSnapshot.child("name").val());
        })
    });
}