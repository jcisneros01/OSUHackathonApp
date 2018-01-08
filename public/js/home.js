document.addEventListener('DOMContentLoaded', defaultCheck);
document.addEventListener('DOMContentLoaded', freezeLink);

function updateDeck(){
	document.getElementById("curdeck").innerText = "Current deck: " + localStorage.deck;	
}

function defaultCheck(){
	if (localStorage.deck === undefined){
		localStorage.deck = "Default";
	}
	updateDeck();
}

var cards;

/************************************************
 *                 freezeLink
 * deactivates study modes if set of cards is empty 
 ***********************************************/
function freezeLink() {
    var req = new XMLHttpRequest();
    var url = "/deck/" + localStorage.deck;
    req.open("GET", url, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            cards = JSON.parse(req.responseText);
			if(cards.length == 0){
				document.getElementById("studymode").setAttribute("href","#");
				document.getElementById("studymode").setAttribute("style", "color: gray");
				document.getElementById("randommode").setAttribute("href","#");
				document.getElementById("randommode").setAttribute("style", "color: gray");
			}
			else{
				document.getElementById("studymode").setAttribute("href","/study");
				document.getElementById("randommode").setAttribute("href","/randommode");
			}
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}