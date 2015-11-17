var express = require('express')

module.exports = function(pool) {
    'use strict';
    var router = express.Router();
    router.use('/api/users', require('./users')(pool))
    router.use('/api/spacial', require('./spacial')(pool))
    return router;
};
