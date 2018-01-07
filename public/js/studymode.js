document.addEventListener('DOMContentLoaded', getCards);

var cards;
var position = 0;

/************************************************
 *                  getCards
 * Retrieved a list of card of decks  
 ***********************************************/
function getCards() {
    var req = new XMLHttpRequest();
    var url = "/deck/" + localStorage.deck;
    req.open("GET", url, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            cards = JSON.parse(req.responseText);
            console.log(cards);
            displayFront();
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}


/************************************************
 *                 displayFront 
 * display front of the card
 ***********************************************/
function displayFront() {
    var cardView = document.getElementById("cardView");
    cardView.innerHTML = cards[position].front;
}

/************************************************
 *                traverseArray 
 * traverse an array of cards 
 ***********************************************/
function traverseArray() {
    position++;
    if (position < cards.length) {
        displayFront();
    } else {
        //user has done the study, show him the congrat page
        window.location.replace("/studydone");
    }
}

/************************************************
 *                 displayFront 
 * display back of the card
 ***********************************************/
function displayBack() {
    var cardView = document.getElementById("cardView");
    cardView.innerHTML = cards[position].back;
}