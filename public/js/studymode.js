document.addEventListener('DOMContentLoaded', getCards);

var cards;
var position = 0;

function getCards() {
        var req = new XMLHttpRequest(); 
        var url = "/cards";
        req.open("GET", url, true);
        req.addEventListener('load', function() {
          if(req.status >= 200 && req.status < 400){
            cards = JSON.parse(req.responseText);
            console.log(cards);
            displayFront();
          } else {
              console.log("Error in network request: " + req.statusText);
          }
        });
        req.send(null);
}

function displayFront() {
  var cardView = document.getElementById("cardView");
  cardView.innerHTML = cards[position].front;
}

function traverseArray() {
  position++;
  if (position < cards.length) {
    displayFront();
  } else {
    alert("Finished");
  }
}

function displayBack() {
  var cardView = document.getElementById("cardView");
  cardView.innerHTML = cards[position].back;
}