function callGoogleMaps(origin, destination) {
    var destUrl = encodeURI(destination);
    var mapsUrl = "http://www.google.com/maps/dir/?api=1&destination=" + destUrl;
    var mapsWindow = window.open(mapsUrl, "_blank");
    mapsWindow.focus();
}
//Todo get customer destination string
function mapsButtonClicked() {
    callGoogleMaps("Konrad Adenauer Straﬂe 34 79540", "Karlsruhe");
}