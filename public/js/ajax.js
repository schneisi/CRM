async function getAjaxContent(aRequestUrl, aCallback, aIsLocalBoolean = true) {
    var theRequest = createRequestWithCallback(aCallback);
    let theUrlString = location.origin + "/" + aRequestUrl;
    theRequest.open("GET", theUrlString, true);
    theRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
    theRequest.send();
}


function createRequestWithCallback(aCallback) {
    var theRequest = new XMLHttpRequest();
    theRequest.onreadystatechange = function() {
        if (theRequest.readyState == XMLHttpRequest.DONE && theRequest.status == 200) {
            aCallback(theRequest.responseText);
        }
    };
    return theRequest;
}