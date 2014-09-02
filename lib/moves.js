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
var tracks = [];
var trackLine = [];
var features = [];
var geoJSON = [];
var dd = 0;
var ss = 0;
function storyline(res, req) {
						request.get({
  						url: this.apiURL + '/user/storyline/daily' +
  						'?from=20140824&to=20140826' +
  						'&trackPoints=true',
  						headers: {Authorization: 'Bearer ' + 'CG0Au1gEn7e5J3SwTMnRM3VHN9OpPOs9W4iIbEdlg_2C296_CE16Q40LP2ts6aad'},
						}, function (error, response, body) {
							console.log(error)
							//console.log(response)
							//console.log(body)
							
							var j = JSON.parse(body);
							tracks = [];
							j.forEach(function(day) {
								dd = dd+1
								ss = 0
								//console.log('Day number ' + dd + '\n')
								day.segments.forEach(function(segment) {
									if (segment.type == 'move') {
										ss = ss + 1
										console.log('Segment number ' + ss + '\n')
										segment.activities.forEach(function(activity) {
											activity.trackPoints.forEach(function(point)
												{
													trackLine.push([point.lon, point.lat]);
													console.log(trackLine.length)
												});	

											features.push([{
									            "type":"Feature",
									            "geometry":{
									                "type":"LineString",
									                "coordinates": trackLine
									            },
									            "properties":{
									            }
				        					}]);
										});
										trackLine = [];
									}
								});
							});
							console.log(features.length)
													geoJSON = {
						    "type": "FeatureCollection",
						    "features": features,
						}
						//console.log('Got here \n\n\n');	
						//console.log(JSON.stringify(features[0]));	
						//console.log('Got here \n\n\n');	

						//console.log(JSON.stringify(features[1]));	
						//console.log('Got here \n\n\n');	
						//console.log(JSON.stringify(features));	

						res.render('index', { user: req.user, name: req.user, data: JSON.stringify(geoJSON)})
						});

					return geoJSON;
					}

module.exports 		= Moves;
