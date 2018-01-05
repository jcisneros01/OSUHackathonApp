// Set up
var express = require("express");
var app = express();
app.set('port', 3000); // set port
app.use(express.static(__dirname + '/public'));

// Routes
app.get("/", function(req, res){
  res.send("index.html");
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