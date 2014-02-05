'use strict';

module.exports = function(app) {    
    // Index route
    var releves = require('../controllers/releves');
    app.get('/releves', releves.all);
    app.get('/releves/:releveId', releves.show);
    app.post('/releves', releves.create);
    app.del('/releves/:releveId', releves.destroy);

    // Finish with setting up the articleId param
    app.param('releveId', releves.releve);
};
