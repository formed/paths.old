// moves.js
/*jslint node: true */
'use strict';

// Moves model should consist of all the data that encapsulates the users moves data, whether it comes from the database or the Moves api. 
// Sperate object for manipulating the Moves API & database connection (probably served by mongoose anyway.)

// user.moves
// user. 
var request 				= require('request');		 
var user 					= [];

user.accessToken 			= 'CG0Au1gEn7e5J3SwTMnRM3VHN9OpPOs9W4iIbEdlg_2C296_CE16Q40LP2ts6aad';

// Moves constructor function
function Moves() {
	this.apiURL 			= 'https://api.moves-app.com/api/1.1';
	this.userProfile		= userProfile;
	this.storyline			= storyline;
	this.test				= test;
}

function test() {
	request('http://www.google.com', 
		function(err, res, body) {
			console.log(body);
			}
		);
	}

// Return user profile
function userProfile() {
						request.get({
  						url: this.apiURL + '/user/profile',
  						headers: {Authorization: 'Bearer ' + 'CG0Au1gEn7e5J3SwTMnRM3VHN9OpPOs9W4iIbEdlg_2C296_CE16Q40LP2ts6aad'},
						}, function (error, response, body) {
							//console.log(body);
						});
					}
// Return storyline profile
function storyline(res, req) {

	// Request data from moves
	request.get({
		url: this.apiURL + '/user/storyline/daily' +
		'?pastDays=7' +
		'&trackPoints=true',
		headers: {Authorization: 'Bearer ' + 'CG0Au1gEn7e5J3SwTMnRM3VHN9OpPOs9W4iIbEdlg_2C296_CE16Q40LP2ts6aad'},
	}, function (error, response, body) {
		
		console.log('ERROR: ' + error);
		
		var trackLine = [];
		var features = [];
		var geoJSON = [];

		// Convert response into a JSON object
		var j = JSON.parse(body);

		console.log(typeof(j))

		// j should contain a maximum of 7 days of data - Loop over these
		j.forEach(function(day) {
			// Loop over each segment in each day
			day.segments.forEach(function(segment) {

				// If the segment has movement data continue to extract the trackpoints
				if (segment.type == 'move') {

					// Loop over each activity in each segment. Activites contain the trackpoints.
					segment.activities.forEach(function(activity) {
													

						// Build an array of trackpoints for insertion into the geoJSON later.
						// trackLine array starts again for each activity
						trackLine = [];
						
						activity.trackPoints.forEach(function(point)
							{
								trackLine.push([point.lon, point.lat]);
							}); // ## END OF TRACKPOINTS LOOP 	
						console.log('\n\n\n The track lines are:\n ' + trackLine);
						// Append new JSON object containing trackLine to features array
						features.push({
				            'type':'Feature',
				            'geometry':{
				                'type':'LineString',
				                'coordinates': trackLine
				            },
				            'properties':{
				            	'activity': activity.group
				            }
						});


					});		// ## END OF ACTIVITY LOOP
					console.log('\n\n\n The features are:\n ' + JSON.stringify(features[0]));
				}	// ## END OF IF STATEMENT
			}); 	// ## END OF SEGMENT LOOP
		});	// END OF DAY LOOP
		
	var f = []
	features.forEach(function(ff)
	{
		f.push(ff);	
	});


	geoJSON = {
	    'type': 'FeatureCollection',
	    'features': features,
	};

	res.render('index', { user: req.user, name: req.user, data: JSON.stringify(geoJSON)});

	});		// END OF REQUEST CALLBACK
}	// END OF STORYLINE FUNCTION


// EXPORT MOVES OBJECT
module.exports 		= Moves;