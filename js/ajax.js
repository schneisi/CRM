
function getAjaxContent(aRequestUrl, aCallback) {
    var theRequest = new XMLHttpRequest();
    let theUrl = location.origin + "/" + aRequestUrl;
    theRequest.onreadystatechange = function() {
        if (theRequest.readyState = XMLHttpRequest.DONE) {
            aCallback(theRequest.responseText);
        }
    }

    theRequest.open("GET", theUrl, true);
    theRequest.setRequestHeader('Access-Control-Allow-Origin', '*');

    theRequest.send();
}