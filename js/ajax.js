
function getAjaxContent(aRequestUrl, aCallback) {
    var theRequest = createRequestWithCallback(aCallback)
    theRequest.open("GET", completeUrlForString(aRequestUrl), true);
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