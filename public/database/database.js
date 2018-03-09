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
        let theErrorCallback = function (anError) {
            logString(anError);
        };
        let theReference = fbDatabase.ref(aPath);
        if (anOrderString) {
            if (anEndObject) {
                theReference.orderByChild(anOrderString).startAt(aStartObject).endAt(anEndObject).limitToFirst(aLimitNumber).once('value').then(aCallback);
            } else {
                theReference.orderByChild(anOrderString).startAt(aStartObject).limitToFirst(aLimitNumber).once('value').then(aCallback);
            }
        } else {
            theReference.once('value', aCallback, theErrorCallback, currentView);
        }
    }

    static startRealTimeQuery(aPath, aCallback) {
        let theReference = fbDatabase.ref(aPath);
        theReference.on("value", aCallback);
    }

    static valueForDate(aDate) {
        return aDate.getTime();
    }

    static birthdayStringForDate(aDate) {
        function addLeadingZero(aNumber) {
            if (aNumber < 10) {
                return "0" + aNumber;
            }
            return aNumber;
        }
        return addLeadingZero(aDate.getMonth() + 1) + "/" + addLeadingZero(aDate.getDate());
    }

    static dateForValue(aNumber) {
        var theDate = new Date();
        theDate.setTime(aNumber);
        return theDate;
    }

    static getCurrentUserId() {
        return firebase.auth().currentUser.uid;
    }
}


//Example
function snapshot() {
    FbDatabase.getDatabaseSnapshot("products", function(aSnapshot) {
        aSnapshot.forEach(function (aChildSnapshot) {
            logString(aChildSnapshot.child("name").val());
        })
    });
}