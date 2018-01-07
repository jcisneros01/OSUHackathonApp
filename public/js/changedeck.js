document.addEventListener('DOMContentLoaded', getCards);
document.addEventListener('DOMContentLoaded', newDeck);
document.addEventListener('DOMContentLoaded', chooseDeck);

var cards;
var listOfDecks = [];

function getCards() {
    var req = new XMLHttpRequest();
    var url = "/cards";
    req.open("GET", url, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            cards = JSON.parse(req.responseText);
			getDecks(cards);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}

function getDecks(cards){
	for (var i=0; i<cards.length; i++){
		var found = 0;
		for (var j =0; j<listOfDecks.length; j++){
			if (cards[i].deck == listOfDecks[j]){
				found = 1;
			}
		}
		if (found == 0){
			listOfDecks.push(cards[i].deck);
		}	
	}		
	populateSelect();
}


function populateSelect(){
	for (var i=0; i<listOfDecks.length; i++){
		var deck = document.createElement("option");
		deck.setAttribute("value", listOfDecks[i]);
		deck.innerText = listOfDecks[i];
		document.getElementById("deck").appendChild(deck);		
	}	
}

function newDeck(){
	document.getElementById("newdeck").addEventListener('click', function(input){
		if(document.getElementById("deckName").value != ""){
			localStorage.setItem("deck", document.getElementById("deckName").value);
			window.location.replace("/");
		}		
	});
}

function chooseDeck(){
	document.getElementById("choosedeck").addEventListener('click', function(input){
		localStorage.setItem("deck", document.getElementById("deck").value);
		window.location.replace("/");
	});
}