// Set up 
var express = require("express");
var app = express();
app.set('port', 3000); // set port
app.use(express.static(__dirname + '/public')); // static files
app.set("view engine", "ejs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/default_deck");

// MONGOOSE/MODEL CONFIG
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
app.get("/", function(req, res){
   res.redirect("/cards"); 
});

// INDEX ROUTE
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