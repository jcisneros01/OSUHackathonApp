document.addEventListener('DOMContentLoaded', defaultCheck);

function updateDeck(){
	document.getElementById("curdeck").innerText = "Current deck: " + localStorage.deck;	
}

function defaultCheck(){
	if (localStorage.deck === undefined){
		localStorage.deck = "OSU Beavers";
	}
	updateDeck();
}

