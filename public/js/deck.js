document.addEventListener('DOMContentLoaded', getCards);

function getCards() {
    var req = new XMLHttpRequest();
    var url = "/cards";
    req.open("GET", url, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var cards = JSON.parse(req.responseText);
            console.log(cards);
            displayCards(cards);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}

function displayCards(cards) {

    for (var i = 0; i < cards.length; i++) {

        //create the a row
        var cardRow = document.createElement("div");
        cardRow.setAttribute("class", "card-row");

        //create a card 
        var card = document.createElement("div");
        card.setAttribute("class", "card");

        //create the content inside the card 
        var ul = document.createElement("ul");
        var cardNumber = document.createElement("h6");
        var li_front = document.createElement("li");
        var li_back = document.createElement("li");
        var buttons = document.createElement("span");

        //create title text
        var card_number = i + 1;
        cardNumber.appendChild(document.createTextNode('Card No.' + card_number));
        cardNumber.setAttribute('id', cards[i]._id);

        //create buttons
        buttons.innerHTML = '<form action="/edit" method="post"><input type="hidden" name="id" value="' + cards[i]._id +
            '"/><input type="submit" class="btn btn-secondary btn-sm" value="Edit"/>' +
            '<span class= "space-between-buttons"></span>' +
            '<input type="button"  class="btn btn-secondary btn-sm" value="Delete" onclick="deleteCard(this)"/></form>';

        //create front and back text
        li_front.appendChild(document.createTextNode('front: ' + cards[i].front));
        li_back.appendChild(document.createTextNode('back: ' + cards[i].back));

        // combine elements into the card
        ul.appendChild(li_front);
        ul.appendChild(li_back);
        card.appendChild(cardNumber);
        card.appendChild(ul);
        card.appendChild(buttons);
        cardRow.appendChild(card);

        // add card inside cardRow
        var list = document.querySelector(".card-list");
        list.appendChild(cardRow);
    }
}

// Delete card and if successfull redirect
function deleteCard(element) {
    var id = element.form.elements[0].value;
    console.log(id);
    var req = new XMLHttpRequest();
    var url = "/delete/" + id;
    req.open("DELETE", url, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            window.location = "/deck";
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}