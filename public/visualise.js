// visualise.js
'use strict';

$(document).ready(function() {
    $(document).scrollsnap({
        snaps: 'section',
        proximity: 100
    });
});

// ********************** D3 Visualisations **********************

var data = d3.csv("http://127.0.0.1:3000/gpx_out.csv",function(csv) {

var latitude = [];
var longitude = [];
var dataOut = [];

for (var i = 0; i < csv.length; i++) {
    latitude[i] = Number(csv[i].latitude)
    longitude[i] = Number(csv[i].longitude)
    dataOut[i] = [latitude[i], longitude[i]]
}

var width = Math.max(760, window.innerWidth),
    height = Math.max(500, window.innerHeight);

var tiler = d3.geo.tile()
    .size([width, height]);

var projection = d3.geo.mercator()
    .center([-2.6, 51.5])
    .scale((1 << 20) / 2 / Math.PI)
    .translate([width / 2, height / 2]);

var geoJSON = {
    "type": "FeatureCollection",
    "features":[
        {
            "type":"Feature",
            "geometry":{
                "type":"LineString",
                "coordinates": dataOut
            },
            "properties":{
            }
        }
    ]
}

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg-chart");
svg.selectAll("g")
    .data(tiler
      .scale(projection.scale() * 2 * Math.PI)
      .translate(projection([0, 0])))
  .enter().append("g")
    .each(function(d) {
      var g = d3.select(this);
      d3.json("http://" + ["a", "b", "c"][(d[0] * 31 + d[1]) % 3] + ".tile.openstreetmap.us/vectiles-highroad/" + d[2] + "/" + d[0] + "/" + d[1] + ".json", function(error, json) {
        g.selectAll("path")
            .data(json.features.sort(function(a, b) { return a.properties.sort_key - b.properties.sort_key; }))
          .enter().append("path")
            .attr("class", function(d) { return d.properties.kind; })
            .attr("d", path);
      });
    });

svg.selectAll("path")
    .data(geoJSON55.features)
    .enter().append("path")
    .attr("d",path)
    .attr("stroke-opacity", 1)
    .attr("stroke-width", 1)  
})