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

    router.post('/register', function(req, res) {
        res.send(req.body);
        /*pool.getConnection(function(err, connection) {
            connection.query('CALL InsertPerson(?,?,?,?,?,?)', function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows[0]);
                connection.release();
            });
        });*/
    });
    return router;
};
