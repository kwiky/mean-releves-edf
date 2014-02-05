'use strict';

module.exports = function(app) {    
    // Index route
    var releves = require('../controllers/releves');
    app.get('/releves/:releveId', releves.show);
    app.post('/releves', releves.create);
};
