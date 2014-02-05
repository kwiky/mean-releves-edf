'use strict';

module.exports = function(app) {    
    // Index route
    var index = require('../controllers/index');
    // Render index jade view
    app.get('/', index.render);
};
