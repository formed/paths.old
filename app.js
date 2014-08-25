// app.js
/*jslint node: true */
'use strict';

var express 	= require('express');					
var passport 	= require('passport');
var mongoose 	= require('mongoose');
var flash 		= require('connect-flash');
var morgan     	= require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser 	= require('body-parser');
var session    	= require('express-session');
var hbs 		= require('hbs');					// Handlebars templating engine

var configDB 	= require('./config/database.js'); 	// Load our db configuration
mongoose.connect(configDB.url);						// Connect to our db.

require('./config/passport')(passport); 			// Configure passport authentication

var app = express();

// Set up express app
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.errorHandler());
app.use(express.methodOverride());
app.use(express.cookieParser('insert-some-entropy-here'));
app.use(express.session());
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(__dirname + '/public'));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

require('./routes')(app, passport); // Load our routes and pass in our app and passport

app.listen(3000);