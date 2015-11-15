var express = require('express')

module.exports = function(pool) {
    'use strict';
    var router = express.Router();
    router.use('/api/users', require('./users')(pool))
    
    return router;
};
