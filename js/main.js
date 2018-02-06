let isDebugging = false;
let isAlwaysOnline = true;

function logString(aString) {
    if (isDebugging) {
        console.log(aString);
    }
}