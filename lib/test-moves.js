// test-moves.js
// moves.js
/*jslint node: true */

GeoJSON = require('geojson');
M = require('./moves');
m = new M()
r = m.storyline()
console.log(r.response.body)


data = r.response.body

var j = JSON.parse(data)

// This don't work!

j1 = j[1].segments[1].activities[0].trackPoints

g = GeoJSON.parse(j1, {Line: ['lat', 'lon']}, function(geojson){
  console.log(JSON.stringify(geojson));
});

