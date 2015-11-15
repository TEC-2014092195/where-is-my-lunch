var express = require('express')

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.get('/:id', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('select * from street', function(err, rows) {
                if (err) throw err;
                console.log('The solution is: ', rows);
                res.send(rows);
                connection.release();
            });
        });

    });
    return router;
};
