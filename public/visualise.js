/*
var vis = d3.select('.chart').append('svg');
var PI = Math.PI;

function taskArc(startDate, stopDate, fillColor) {
    var r = (stopDate - startDate);
    var arc = d3.svg.arc()
    .innerRadius(r)
    .outerRadius(r + 2)
    .startAngle(-90 * (PI / 180)) //convert from degs to radians
    .endAngle(90 * (PI / 180)); //just radians
    vis.append('path')
    .attr('d', arc)
    .attr('transform', 'translate('+ stopDate +',490)')
    .style('fill', fillColor);
}
var i = 0;
for (i = 0; i < 300; i++) {
    var taskDuration = Math.random() * 470;
    var start = -470 + 940 * Math.random();
    var stop = start + taskDuration;
    var fillColor = 'black';
    if (Math.random() > 0.8) {fillColor = '#C0392B'};
    console.log(fillColor);
    taskArc(start, stop, fillColor);
}

// Define the date as being anywhere between 1 and 470
// !st set the length 

*/
d3.json('http://127.0.0.1:3000/map', function(error, trackData) {
var data = d3.csv("http://127.0.0.1:3000/gpx_out.csv",function(csv) {

var latitude = [];
var longitude = [];
var dataOut = [];

for (var i = 0; i < csv.length; i++) {
    latitude[i] = Number(csv[i].latitude)
    longitude[i] = Number(csv[i].longitude)
    dataOut[i] = [latitude[i], longitude[i]]
}

var width = Math.max(960, window.innerWidth),
    height = Math.max(500, window.innerHeight);

var tiler = d3.geo.tile()
    .size([width, height]);

var projection = d3.geo.mercator()
    .center([-2.6, 51.5])
    .scale((1 << 15) / 2 / Math.PI)
    .translate([width / 2, height / 2]);
/*
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
} */

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg-chart");;

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

    /*
    svg.selectAll("path")
    .data(geoJSON.features)
    .enter().append("path")
    .attr("d",path)
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 0.5)
    */
    for (var i = 0; i < trackData.length; i++) {
        console.log('We got here at least\n')
        svg.selectAll("path")
        .data(trackData[i].tracks.features)
        .enter().append("path")
        .attr("class", function(d) { return d.properties.activity; })
        .attr("d",path)
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 0.5)
    };

})
})
