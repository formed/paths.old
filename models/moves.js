/*jslint node: true */
'use strict';
// moves.js

var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

// define the schema for our user model
var movesSchema = mongoose.Schema({
    	tracks:GeoJSON.FeatureCollection,
        day		: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Moves', movesSchema);