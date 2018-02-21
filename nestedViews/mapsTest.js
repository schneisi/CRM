function callGoogleMaps(origin, destination) {
    var destUrl = encodeURI(destination)
    var mapsUrl = "http://www.google.com/maps/dir/?api=1&destination=" + destUrl;
    window.location = mapsUrl;
}
function buttonClicked() {
    callGoogleMaps("Konrad Adenauer Straﬂe 34 79540", "Karlsruhe");
    /*window.location = "http://www.google.de/";*/
}