'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Releve = mongoose.model('Releve'),
    _ = require('lodash');

/**
 * Index
 */
exports.index = function(req, res) {
    res.render('releves/index', {
        title: 'Ajouter un relevé'
    });
};

/**
 * Create a releve
 */
exports.create = function(req, res, next) {
    var releve = new Releve(req.body);

    releve.save(function(err) {
        if (err) {
            
        } else {
            res.jsonp(releve);
        }
    });
};

/**
 * Show a releve
 */
exports.show = function(req, res) {
    res.jsonp(req.releve);
};