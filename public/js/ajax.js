
async function getAjaxContent(aRequestUrl, aCallback, aIsLocalBoolean = true) {
    var theRequest = createRequestWithCallback(aCallback)
    let theUrlString;
    if (aIsLocalBoolean) {
        theUrlString = completeUrlForString(aRequestUrl);
    } else {
        theUrlString = aRequestUrl;
    }
    theRequest.open("GET", theUrlString, true);
    theRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
    theRequest.send();
}

function postAjaxContent(aRequestUrl, aCallback, aContentString) {
    var theRequest = createRequestWithCallback(aCallback);
    theRequest.open("POST", completeUrlForString(aRequestUrl), true);
    theRequest.send(aContentString);
}


function createRequestWithCallback(aCallback) {
    var theRequest = new XMLHttpRequest();
    theRequest.onreadystatechange = function() {
        if (theRequest.readyState == XMLHttpRequest.DONE && theRequest.status == 200) {
            aCallback(theRequest.responseText);
        }
    }
    return theRequest;
}

function completeUrlForString(aString) {
    return location.origin + "/" + aString;
}