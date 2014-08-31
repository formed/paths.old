// test-moves.js
// moves.js
/*jslint node: true */

GeoJSON = require('geojson');
M = require('./moves');
m = new M()
r = m.storyline()

data = r.response.body
var j = JSON.parse(data)

var tracks = []
var trackLine = []

j.forEach(function(day) {
	day.segments.forEach(function(segment) {
		if (segment.type == 'move') {
			segment.activities.forEach(function(activity) {
				trackLine = []
				obj = []
				activity.trackPoints.forEach(function(point)
				{
					trackLine.push([point.lat, point.lon, point.time])
				}) 
				obj.trackLine = trackLine
				obj.group = activity.group
				obj.duration = activity.duration
				obj.distance = activity.distance
				obj.avgSpeed = obj.distance / obj.duration
				obj.startTime = activity.startTime
				obj.stopTime = activity.stopTime 
				tracks.push(obj)
			});		
		}
	});
});