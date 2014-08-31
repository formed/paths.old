// passport.js
/*jslint node: true */
'use strict';

// Load the authentication strategies we require
// var AsanaStrategy = require('passport-asana').Strategy;
var MovesStrategy 	= require('../third_party_modules/passport-moves').Strategy;

// load up the user model uncomment this
var User 			= require('../models/user');

var config 			= require('./config');

module.exports = function(passport) {
	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete Moves user profile is serialized
	//   and deserialized.
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	// Use the MovesStrategy within Passport.
	//   Strategies in Passport require a `verify` function, which accept
	//   credentials (in this case, an accessToken, refreshToken, and Moves
	//   profile), and invoke a callback with a user object.
	passport.use(new MovesStrategy({
	    clientID: config.movesAuth.clientID,			// Moves clinent ID is set in config.js
	    clientSecret: config.movesAuth.clientSecret,	// Moves client secret is set in config.js
	    callbackURL: config.movesAuth.callbackURL,		// Moves callback URL is set in config.js
	  },
	  function(accessToken, refreshToken, profile, done) {
	    // asynchronous verification, for effect...
	    process.nextTick(function () {

	    	// Check to see if a user already exists
	    	User.findOne({'moves.id' : profile.id}, function(err, user){
	    		// If there is an error stop everything and report the error
	    		if (err)
	    			return done(err);
	    		if (user) {
	    			return done(null, user); // User found return this user
	    		} else {
	    			// If no user was found create a new one
	    			var newUser	= new User();

	    			// Set all the moves information in the model.
	    			newUser.moves.id 		= profile.id;
	    			newUser.moves.token 	= accessToken;

	    			// Save our new user to the db
	    			newUser.save(function(err) {
	    				if (err) 
	    					throw err;

	    				// if successful return the new user
	    				return done(null, newUser);
	    			});
	    		}
	    	});
	      
	      // To keep the example simple, the user's Moves profile is returned to
	      // represent the logged-in user.  In a typical application, you would want
	      // to associate the Moves account with a user record in your database,
	      // and return that user instead.
	      // return done(null, profile);
	    });
	  }
	));
};