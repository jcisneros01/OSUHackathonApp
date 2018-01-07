document.addEventListener('DOMContentLoaded', updateDeck);

function updateDeck(){
	document.getElementById("curdeck").innerText = "Current deck: " + localStorage.deck;	
}