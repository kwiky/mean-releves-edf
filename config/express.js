'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    helpers = require('view-helpers'),
    config = require('./config');

module.exports = function(app, db) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(express.logger('dev'));
    }

    // Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    // Enable jsonp
    app.enable("jsonp callback");

    app.configure(function() {
        // The cookieParser should be above session
        app.use(express.cookieParser());

        // Request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        // Dynamic helpers
        app.use(helpers(config.app.name));

        // Routes should be at the last
        app.use(app.router);

        // Stylus middleware
        app.use(stylus.middleware({
            src: config.root + '/app/views', // .styl files are located in `/app/views/css`
            dest: config.root + '/public', // .styl resources are compiled `/public/css/*.css`
            compile: function (str, path) { // compilation
              return stylus(str)
                  .set('filename', path)
                  .set('compress', true)
                  .use(nib())
                  .import('nib');
            }
        }));
        
        // Setting the fav icon and static folder
        app.use(express.favicon());
        app.use(express.static(config.root + '/public'));

        // Assume "not found" in the error msgs is a 404. this is somewhat
        // silly, but valid, you can do whatever you like, set properties,
        // use instanceof etc.
        app.use(function(err, req, res, next) {
            // Treat as 404
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        // Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });
    });
};