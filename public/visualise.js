var map = L.map('map').setView([51.48, -2.612574], 12);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
maxZoom: 18,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'examples.map-20v6611k'
}).addTo(map);

var trackLayer = L.geoJson().addTo(map);


d3.json('moves/tracks', function(error, tracks) {
  console.log(tracks)
    for (var i = 0; i < tracks.length; i++) {
        L.geoJson(tracks[i].tracks, {
    style: function(feature) {
        switch (feature.properties.activity) {
            case 'walking': return {color: "#29E605", "opacity": 0.8, "weight": 1.5};
            case 'running':   return {color: "#FFB800", "opacity": 0.8, "weight": 1.5};
            case 'cycling':   return {color: "#00cdec", "opacity": 0.6, "weight": 1};
            case 'transport':   return {color: "#FF21F8", "opacity": 0.4, "weight": 0.3};
        }
    }
}).addTo(map)
    };   
});


/*
var width = Math.max(960, window.innerWidth),
    height = Math.max(505, window.innerHeight+5);

var svg = d3.select('#section4').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg-chart");

var z = {};
z.levels                = [10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23];
z.strokeWidth = {};
z.strokeWidth.cycling   = [2, 2, 2, 1.5, 1.5, 1.5, 1.5, 1, 1, 1, 1, 1, 1];
z.strokeWidth.walking   = [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1];
z.strokeWidth.running   = [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1];
z.strokeWidth.transport = [5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var zoomLevel = 8;

baseMap('#section4', zoomLevel);


d3.json('moves/tracks', function(error, movesData) {
  var movesData = movesData;
  L.geoJson(movesData).addTo(map);
  addMovesData(movesData, '#section4', zoomLevel);
  $("#loading").remove();
  $('#zoomInstructions').show();

  $(document).on('keydown', null, 'x', function() {
    zoomLevel = Math.min(12, ++zoomLevel);
      $('svg').empty();
      baseMap('#section4', zoomLevel);
      addMovesData(movesData, '#section4', zoomLevel);
  });

  $(document).on('keydown', null, 'z', function() {
    zoomLevel = Math.max(0, --zoomLevel);
    $('svg').empty();
    baseMap('#section4', zoomLevel);
    addMovesData(movesData, '#section4', zoomLevel);
  });

});

function baseMap(section, zoomLevel) {

var tiler = d3.geo.tile()
    .size([width, height]);

var projection = d3.geo.mercator()
    .center([-2.612574, 51.48])
    .scale((1 << z.levels[zoomLevel]) / 2 / Math.PI)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

svg.selectAll("g")
    .data(tiler
      .scale(projection.scale() * 2 * Math.PI)
      .translate(projection([0, 0])))
    .enter().append("g")
    .each(function(d) {
      var g = d3.select(this);
      d3.json("http://" + ["a", "b", "c"][(d[0] * 31 + d[1]) % 3] + ".tile.openstreetmap.us/vectiles-water-areas/" + d[2] + "/" + d[0] + "/" + d[1] + ".json", function(error, json) {
        g.selectAll("path")
            .data(json.features.sort(function(a, b) { return a.properties.sort_key - b.properties.sort_key; }))
          .enter().append("path")
            .attr("class", function(d) { return d.properties.kind; })
            .attr("d", path);
      });

    d3.json("http://" + ["a", "b", "c"][(d[0] * 31 + d[1]) % 3] + ".tile.openstreetmap.us/vectiles-highroad/" + d[2] + "/" + d[0] + "/" + d[1] + ".json", function(error, json) {
        g.selectAll("path")
            .data(json.features.sort(function(a, b) { return a.properties.sort_key - b.properties.sort_key; }))
            .enter().append("path")
            .attr("class", function(d) { return d.properties.kind; })
            .attr("d", path);
      });
 });
}

function addMovesData(movesData, section, zoomLevel) {
  console.log(movesData)
  var projection = d3.geo.mercator()
      .center([-2.612574, 51.48])
      .scale((1 << z.levels[zoomLevel]) / 2 / Math.PI)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

    for (var i = 0; i < movesData.length; i++) {
        svg.selectAll('g')
        .data(movesData[i].tracks.features)
        .enter().append("path")
        .attr("class", function(d) { return d.properties.activity; })
        .attr("d",path)
    };

    $('.walking').css('stroke-width', z.strokeWidth.walking[zoomLevel]);
    $('.running').css('stroke-width', z.strokeWidth.running[zoomLevel]);
    $('.cycling').css('stroke-width', z.strokeWidth.cycling[zoomLevel]);
    $('.transport').css('stroke-width', z.strokeWidth.transport[zoomLevel]);
}
*/