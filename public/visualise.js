

var width = Math.max(960, window.innerWidth),
    height = Math.max(505, window.innerHeight+5);




baseMap('#section1',13);
baseMap('#section2',16);
baseMap('#section3',19);
baseMap('#section4',20);


d3.json('moves/tracks', function(error, movesData) {
  addMovesData(movesData, '#section1', 13);
  addMovesData(movesData, '#section2', 16);
  addMovesData(movesData, '#section3', 19);
  addMovesData(movesData, '#section4', 20);
});


function baseMap(section, zoomLevel) {

var tiler = d3.geo.tile()
    .size([width, height]);

var projection = d3.geo.mercator()
    .center([-2.65, 51.48])
    .scale((1 << zoomLevel) / 2 / Math.PI)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(section).append("svg")
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
    var svg = d3.select(section + ' svg');

  var projection = d3.geo.mercator()
      .center([-2.65, 51.48])
      .scale((1 << zoomLevel) / 2 / Math.PI)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

    for (var i = 0; i < movesData.length; i++) {
        svg.selectAll("g")
        .data(movesData[i].tracks.features)
        .enter().append("path")
        .attr("class", function(d) { return d.properties.activity; })
        .attr("d",path)
    };
}
