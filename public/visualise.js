

var map = L.map('map').setView([51.48, -2.612574], 2);

var HERE_normalNightGrey = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.night.grey/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
  attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
  subdomains: '1234',
  mapID: 'newest',
  app_id: 'Sy4R85IN5pppRWXOmRP0',
  app_code: 'H4vGrMOBPTpWdix1uXAcfg',
  base: 'base',
  minZoom: 0,
  maxZoom: 20
}).addTo(map);


/*
L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
maxZoom: 18,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'examples.map-20v6611k'
}).addTo(map);
*/

var trackLayer = L.geoJson().addTo(map);


d3.json('moves/tracks', function(error, tracks) {
  console.log(tracks)
    for (var i = 0; i < tracks.length; i++) {
        L.geoJson(tracks[i].tracks, {
    style: function(feature) {
        switch (feature.properties.activity) {
            case 'walking': return {color: "#00D45B", "opacity": 0.8, "weight": 1.5};
            case 'running':   return {color: "#FC00F8", "opacity": 0.8, "weight": 1.5};
            case 'cycling':   return {color: "#00BFFF", "opacity": 0.8, "weight": 0.5};
            case 'transport':   return {color: "#FF9F01", "opacity": 0.3, "weight": 0.4};
        }
    }
}).addTo(map)
    };   
});

map.locate({setView: true, maxZoom: 12});

function getTransportColor(d) {
    return d > 40 ? '#FF76FB' :
           d > 30  ? '#FF38F9' :
           d > 20  ? '#FF00F7' :
           d > 14   ? '#A1009C' :
           d > 7   ? '#82007E' :
                      '#62005F';
}

function getCyclingColor(d) {
    return d > 40 ? '#FF76FB' :
           d > 30  ? '#FF38F9' :
           d > 20  ? '#FF00F7' :
           d > 14   ? '#A1009C' :
           d > 7   ? '#82007E' :
                      '#62005F';
}

function getWalkingColor(d) {
    return d > 40 ? '#FF76FB' :
           d > 30  ? '#FF38F9' :
           d > 20  ? '#FF00F7' :
           d > 14   ? '#A1009C' :
           d > 7   ? '#82007E' :
                      '#62005F';
}
