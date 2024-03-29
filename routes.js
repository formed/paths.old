// routes.js
/*jslint node: true */
'use strict';

var M = require('./lib/moves-api.js');
var Moves= require('./models/moves.js');

// Routes
// Index ifLoggedin redirect

module.exports = function(app, passport) {

	// Index page.
	app.get('/', function(req, res){
		res.render('index', { user: req.user, name: req.user});
	});

	// Inserts the data into
	app.get('/moves/sync', function(req, res){
		var m = new M()
		m.storyline(res, req)
	});
	
	// Serves the moves storyline data served from db
	app.get('/moves/tracks', function(req, res){
		Moves.find()
		.select('-_id tracks').sort([['day', 'ascending']])
		.exec( function (err, tracks) {
			res.json(tracks)
		})
		
	});


	app.get('/account', isLoggedIn, function(req, res){
	  res.render('account', { user: req.user });
	});

	app.get('/login', function(req, res){
	  res.render('login', { user: req.user });
	});

	// GET /auth/moves
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in moves authentication will involve
	//   redirecting the user to asana.com.  After authorization, asana.com will
	//   redirect the user back to this application at /auth/asana/callback

	app.get('/auth/moves',
	  passport.authenticate('moves'),
	  function(req, res){
	    // The request will be redirected to Moves for authentication, so this
	    // function will not be called.
	  });

	// GET /auth/asana/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/moves/callback', 
	  passport.authenticate('moves', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	app.get('/auth/moves/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  	res.redirect('/login'); 
  	conaolw.log('Could not authenticate');
	}
};