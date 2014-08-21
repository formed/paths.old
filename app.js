// app.js
/*jslint node: true */
'use strict';

var express = require('express');
var passport = require('passport');
var hbs = require('hbs');

require('./config/passport')(passport); // Load our routes and pass in our app and passport

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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