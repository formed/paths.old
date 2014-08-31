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
function storyline() {
						request.get({
  						url: this.apiURL + '/user/storyline/daily' +
  						'?pastDays=7' +
  						'&trackPoints=true',
  						headers: {Authorization: 'Bearer ' + 'CG0Au1gEn7e5J3SwTMnRM3VHN9OpPOs9W4iIbEdlg_2C296_CE16Q40LP2ts6aad'},
						}, function (error, response, body) {
							var j = JSON.parse(body);
							tracks = [];
							trackLine = [];
							j.forEach(function(day) {
								day.segments.forEach(function(segment) {
									if (segment.type == 'move') {
										segment.activities.forEach(function(activity) {
											trackLine.length = 0;
											activity.trackPoints.forEach(function(point)
											{
												trackLine.push([point.lon, point.lat]);
											});
											console.dir(trackLine)
											features.push([
									        {
									            "type":"Feature",
									            "geometry":{
									                "type":"LineString",
									                "coordinates": trackLine
									            },
									            "properties":{
									            }
				        					}
				   		 					]);
										});		
									}
								});
							});
						var geoJSON = {
						    "type": "FeatureCollection",
						    "features": features,
						}
					console.log(JSON.stringify(geoJSON));
						});
					return tracks;
					}

module.exports 		= Moves;
