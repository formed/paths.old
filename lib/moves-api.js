// moves-lib.js
/*jslint node: true */
'use strict';

// Moves model should consist of all the data that encapsulates the users moves data, whether it comes from the database or the Moves api. 
// Sperate object for manipulating the Moves API & database connection (probably served by mongoose anyway.)

// user.moves
// user. 
var request 				= require('request');	
var Moves 					= require('../models/moves.js')	 
var user 					= [];
var sleep					= require('sleep')

user.accessToken 			= 'CG0Au1gEn7e5J3SwTMnRM3VHN9OpPOs9W4iIbEdlg_2C296_CE16Q40LP2ts6aad';

// Moves constructor function
function MovesAPI() {
	this.apiURL 			= 'https://api.moves-app.com/api/1.1';
	this.userProfile		= userProfile;
	this.storyline			= storyline;
}

// Add a yymmdd format to the date
Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:'0'+mm[0]) + (dd[1]?dd:'0'+dd[0]); // padding
  };

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

		var trackLine = [];
		var features = [];

	// Request data from moves
		
		for (var i = 0; i < 292; i=i+7) {
		sleep.sleep(1)
		var d = new Date();
		var dateOffset = i;
		d.setDate(d.getDate()-dateOffset);
		var stopDate = d.yyyymmdd();
		d.setDate(d.getDate()-6);
		var startDate = d.yyyymmdd();
		console.log('\nStart date is: ' + startDate)

		var dateStr = '?from=' + startDate + '&to=' + stopDate;
	request.get({
		url: this.apiURL + '/user/storyline/daily' + dateStr + '&trackPoints=true',
		headers: {Authorization: 'Bearer ' + 'CG0Au1gEn7e5J3SwTMnRM3VHN9OpPOs9W4iIbEdlg_2C296_CE16Q40LP2ts6aad'},
	}, function (error, response, body) {
		
		console.log('\n\nERROR: ' + error + '\n');
		// Convert response into a JSON object
		var j = JSON.parse(body);


		// j should contain a maximum of 7 days of data - Loop over these
		j.forEach(function(day) {
			// Loop over each segment in each day
			if (day.segments) {
			var today = new Date(day.date.substr(0,4), day.date.substr(4,2), day.date.substr(6,2));
			day.segments.forEach(function(segment) {
				if (segment) {
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
					// console.log('\n\n\n The features are:\n ' + JSON.stringify(features[0]));
				}	// ## END OF IF STATEMENT
				}
			}); 
			}	// ## END OF SEGMENT LOOP
				var f = [];
				features.forEach(function(ff)
				{
					f.push(ff);
				});

				var geoJSON = {
				    'type': 'FeatureCollection',
				    'features': features,
				};


				var movesDay = new Moves();
				console.log('\n\n Proessing: ' + today);
				//var today = new Date();


				//movesDay.tracks = geoJSON;
				movesDay.day = today;
				movesDay.tracks = geoJSON;
				movesDay.save(function (err) {
					console.log('Errors on db save ' + err);
				});
		});	// END OF DAY LOOP

	});		// END OF REQUEST CALLBACK
}
	res.render('index', { user: req.user, name: req.user});

}	// END OF STORYLINE FUNCTION


// EXPORT MOVES OBJECT
module.exports 		= MovesAPI;