// Set up 
var express = require("express");
var app = express();
var path = require('path');
app.set('port', 3000); // set port
app.use(express.static(__dirname + '/public')); // static files

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

// Add test cards
Card.create({
   front: "What is the meaning of life?",
   back: "42"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

Card.create({
   front: "What is the sky's color?",
   back: "blue"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

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


// Restful Routes
app.get("/cards", function(req, res){
   Card.find({}, function(err, cards){
       if(err){
           console.log("ERROR!");
       } else {
          console.log(cards);
       }
   });
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