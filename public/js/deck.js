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

        //create the elements
        var cardRow = document.createElement("div");
        cardRow.setAttribute("class", "card card-row");
        
        var ul = document.createElement("ul");
        var cardNumber = document.createElement("h6");
        var li_front = document.createElement("li");
        var li_back = document.createElement("li");
        var buttons = document.createElement("span");

        //add edit button and delete button for each card
        var card_number = i+1;
        cardNumber.appendChild(document.createTextNode('Card No.' + card_number));
        cardNumber.setAttribute('id', cards[i]._id);

        buttons.innerHTML = '<form action="/edit" method="post"><input type="hidden" name="id" value="' + cards[i]._id +
            '"/><input type="submit" class="btn btn-secondary btn-sm" value="Edit"/>' + 
            '<span class= "space-between-buttons"></span>' +
            '<input type="button"  class="btn btn-secondary btn-sm" value="Delete" onclick="deleteCard(this)"/></form>';


        //display front and back 
        li_front.appendChild(document.createTextNode('front: ' + cards[i].front));
        li_back.appendChild(document.createTextNode('back: ' + cards[i].back));

        ul.appendChild(li_front);
        ul.appendChild(li_back);

        var list = document.querySelector(".card-list");

         
        cardRow.appendChild(cardNumber);
        cardRow.appendChild(ul);
        cardRow.appendChild(buttons);
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
