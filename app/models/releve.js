'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Releve Schema
 */
var ReleveSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    hp: {
        type: Number
    },
    hc: {
        type: Number
    }
});

mongoose.model('Releve', ReleveSchema);
