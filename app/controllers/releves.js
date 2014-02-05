'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Releve = mongoose.model('Releve'),
    _ = require('lodash');

/**
 * Find releve by id
 */
exports.releve = function(req, res, next, id) {
    Releve.load(id, function(err, releve) {
        if (err) return next(err);
        if (!releve) return next(new Error('Failed to load releve ' + id));
        req.releve = releve;
        next();
    });
};

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

/**
 * List of releves
 */
exports.all = function(req, res) {
    Releve.find().sort('-created').exec(function(err, releves) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(releves);
        }
    });
};

/**
 * Delete a releve
 */
exports.destroy = function(req, res) {
    var releve = req.releve;
    releve.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(releve);
        }
    });
};