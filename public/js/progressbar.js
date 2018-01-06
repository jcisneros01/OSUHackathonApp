document.addEventListener('DOMContentLoaded', getCount);

var rawCards;
var countCards;
var valueNow;
var pos = 0;

function getCount() {
    var req = new XMLHttpRequest();
    var url = "/cards";
    req.open("GET", url, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            rawCards = JSON.parse(req.responseText);
			countCards = rawCards.length;          
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}

//increments status bar
function increment() {
	pos++;
    valueNow = "width: " + ((pos/countCards) * 100) + "%";
	document.getElementById("pBar").setAttribute("style", valueNow);
}