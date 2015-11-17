var express = require('express')

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.get('/getStreets', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL getStreets()', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    router.get('/getAvenues', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL getAvenues()', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    router.get('/getBlocks', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL getBlocks()', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    router.post('/infoRestaurant', function(req, res) {
        
        pool.getConnection(function(err, connection) {
            connection.query('CALL infoRestaurant(?)',req.body.idRestaurant, function(err, rows) {
                if (err) throw err;
                res.send(rows[0][0]);
                connection.release();
            });
        });
    });
    
    return router;
};
