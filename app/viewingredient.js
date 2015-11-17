var express = require('express')
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.post('viewingredient', function(req, res) {
        var d = JSON.parse(req.body.data);
        pool.getConnection(function(err, connection) {
            connection.query("CALL GetIngredientsFromRestaurant(?)",[d.idRestaurant], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows);
                connection.release();
            });
        });
    });

    router.post('deleteingredient', function(req, res) {
        var d = JSON.parse(req.body.data);
        pool.getConnection(function(err, connection) {
            connection.query("CALL DeleteIngredient(?,?)",[d.idIngredient,d.idRestaurant], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows);
                connection.release();
            });
        });
    });
    
    return router;
};
