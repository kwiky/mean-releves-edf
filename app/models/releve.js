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

/**
 * Statics
 */
ReleveSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Releve', ReleveSchema);
