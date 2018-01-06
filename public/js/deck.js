// Testing data
var cards = [

    card1 = {
        front: "This is a card front 1",
        back: "This is a card back 1"
    },

    card2 = {
        front: "This is a card front 2",
        back: "This is a card back 2"
    },

    card3 = {
        front: "This is a card front 3",
        back: "This is a card back 3"
    }
];

// set up an counter
var counter = 1;

/***********************************************************
 *                     createCardList
 * For each card in the card list, insert a title, follow
 * by a ul and two li showing front and back onto the 
 * html page.  
 **********************************************************/
var createCardList = cards.forEach((card) => {

    //create the elements
    var ul = document.createElement("ul");
    var cardNumber = document.createElement("div");
    var li_front = document.createElement("li");
    var li_back = document.createElement("li");
    var buttons = document.createElement("span");

    //add edit button and delete button for each card
    cardNumber.appendChild(document.createTextNode('Card No.' + counter));
    buttons.innerHTML = '<form action="/getId" method="post"><input type="hidden" name="id" value="'
        + '"/><input type="submit" class="btn-block" value="Edit"/>'
        + '<input type="button"  class="btn-block" value="Delete" onclick="deleteRow(this)"/></form>';

    cardNumber.appendChild(buttons);

    //display front and back 
    li_front.appendChild(document.createTextNode('front: ' + card.front));
    li_back.appendChild(document.createTextNode('back: ' + card.back));

    ul.appendChild(li_front);
    ul.appendChild(li_back);

    var list = document.querySelector(".card-list");
    list.appendChild(cardNumber);
    list.appendChild(ul);

    counter++;
});


