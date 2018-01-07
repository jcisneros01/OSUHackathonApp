//==========================
// Set up
//==========================
var express = require("express");
var app = express();
var path = require('path');
var passport = require("passport")
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

app.set('port', 3000); // set port
app.use(express.static(__dirname + '/public')); // static files
app.set("view engine", "ejs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/default_deck");


//==========================
// Models
//==========================

// Users
var UserSchema = new mongoose.Schema({
  email: String,
  name: String
});

UserSchema.plugin(passportLocalMongoose)
var User = mongoose.model("User", UserSchema);

// Cards
var cardSchema = new mongoose.Schema({
    front: String,
    back: String,
    deck: String,
    author: {
       id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
       },
       username: String
    }
});

var Card = mongoose.model("Card", cardSchema);


//==========================
// PASSPORT CONFIGURATION
//==========================
app.use(require("express-session")({
    secret: "super secret message",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//==========================
// Routes
//==========================
app.get('/home', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.get('/add', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/add.html'));
});

app.get('/back', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/back.html'));
});

app.get('/front', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/front.html'));
});

app.get('/deck', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/deck.html'));
});

app.get('/study', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/studymode.html'));
});

app.get('/studydone', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/studydone.html'));
});

app.get('/changedeck', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/changedeck.html'));
});

app.get('/randommode', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/randommode.html'));
});

//==========================
// Restful Routes
//=========================


// Retrieve all cards
app.get("/cards", function(req, res){
   Card.find({author: {
        id: req.user._id,
        username: req.user.username
   }}, function(err, cards){
       if(err){
           res.status(500).send({message: "Some error occurred while retrieving notes."});
       } else {
          console.log(cards);
          res.send(cards);
       }
   });
});

// Retrieve cards from one deck
app.get("/deck/:deck", function(req, res){
	console.log(req.params.deck);
   Card.find({deck:req.params.deck}, function(err, cards){
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
    back: req.body.back,
	  deck: req.body.deck,
    author: {
        id: req.user._id,
        username: req.user.username
    }
  }, function(err, card){
      if(err){
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the card."});
      } else {
          //then, redirect to the index
          console.log(card);
          res.redirect('/deck');
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

// Edit a card
app.post('/edit', function(req, res) {
    Card.findById(req.body.id, function(err, card){
	  if(err){
		  console.log(err);
		  res.status(500).send({message: "Could not edit card with id " + req.body.id});
	  } else{
		  res.render("edit", {card: card});
	  }
  });
});

// Update a card
app.put('/update/:id', function(req, res) {
    Card.findByIdAndUpdate(req.params.id,
    {
      front: req.body.front,
      back: req.body.back
    }, 
     function(err, card){
       if(err){
          res.status(500).send({message: "Could not update note with id " + req.params.noteId});
       }  else {
           res.send(card);
       }
    });
  });

// Delete a card
app.delete('/delete/:id', function(req, res) {
    Card.findByIdAndRemove(req.params.id, function(err) {
      if(err){
             console.log(err);
             res.status(500).send({message: "Could not delete note with id " + req.params.id});
         } else {
             res.send({message: "Note deleted successfully!"})
         }
    });
  });

//==========================
// AUTH ROUTES
//==========================

// Register
app.get("/register", function(req, res){
   res.render("register"); 
});

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/home"); 
        });
    });
});

// Login
app.get("/", function(req, res){
   res.render("login"); 
});

app.post("/", passport.authenticate("local", 
    {
        successRedirect: "/home",
        failureRedirect: "/"
    }), function(req, res){
});

// Logout
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

//==========================
// Error Handling routes
//==========================
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

//==========================
// Start server
//==========================
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
