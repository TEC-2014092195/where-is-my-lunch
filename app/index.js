var express = require('express')

module.exports = function(pool) {
    'use strict';
    var router = express.Router();
    router.use('/api/users', require('./users')(pool))
    router.use('/api/spacial', require('./spacial')(pool))
    router.use('/api/ingredients', require('./ingredients')(pool))
    router.use('/api/dishes', require('./dishes')(pool))
    router.use('/api/payments', require('./payments')(pool))
    return router;
};
