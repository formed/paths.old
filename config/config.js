// auth.js
/*jslint node: true */
'use strict';

module.exports = {
	'movesAuth' : {
		'clientID' 		: 'Y6fvaDa4wbt8ts8bg2zppkerxVn4h9o9', 											// your App ID
		'clientSecret' 	: 'L4BgUuGTuzJgdrJ08vCBRe1pRnlH7bh1oaMA7F82aCoV57E_mbUkjzIcZKdoKFRp', 			// your App Secret
		'callbackURL' 	: 'http://127.0.0.1:3000/auth/moves/callback'									// Callback
	},
	movesAPI : {
		'url'		: 'https://api.moves-app.com/oauth/v1/user/summary/daily/2013-W09' 
	}
};