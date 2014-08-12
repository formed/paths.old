var express = require('express');
var app = express();

var hbs = require('hbs');

app.set('view engine', 'html');	// Changes the default extension from .hbl to .html
app.engine('html', hbs.__express); // Uses the handlebar template engine


app.get('/', function(req, res) {
	res.render('index');
});

// Start the server
app.listen(3000);