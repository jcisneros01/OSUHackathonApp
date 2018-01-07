document.addEventListener('DOMContentLoaded', applyDeck);

function applyDeck(){
	document.getElementById("deck").setAttribute("value", localStorage.deck);	
}