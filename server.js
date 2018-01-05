// Set up 
var express = require("express");
var app = express();
var path = require('path');
app.set('port', 3000); // set port
app.use(express.static(__dirname + '/public')); // static files
app.set("view engine", "ejs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/default_deck");

// Mongoose Model
var cardSchema = new mongoose.Schema({
    front: String,
    back: String
});

var Card = mongoose.model("Card", cardSchema);

// Routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.get('/add', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/add.html'));
});

app.get('/edit', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/edit.html'));
});

app.get('/back', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/back.html'));
});

app.get('/front', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/front.html'));
});


/*Restful Routes*/

// Retrieve all cards
app.get("/cards", function(req, res){
   Card.find({}, function(err, cards){
       if(err){
           res.status(500).send({message: "Some error occurred while retrieving notes."});
       } else {
          console.log(cards);
          res.send(cards);
       }
   });
});

// Create a card
app.post('/add', function(req, res) {
  Card.create({
    front: req.body.front,
    back: req.body.back
  }, function(err, card){
      if(err){
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the card."});
      } else {
          //then, redirect to the index
          console.log(card);
          res.redirect('/');
      }
  });
});

// Retrieve a card
app.get('/card/:id', function(req, res) {
  Card.findById(req.params.id, function(err, card) {
    if(err){
           console.log(err);
           res.status(500).send({message: "Could not retrieve card with id " + req.params.id});
       } else {
           res.send(card);
           console.log(card);
       }
  });
});

// Update a card
app.put('/edit/:cardID', function(req, res) {

  });

// Delete a card
app.delete('/delete/:cardID', function(req, res) {

  });


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// Start server
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});