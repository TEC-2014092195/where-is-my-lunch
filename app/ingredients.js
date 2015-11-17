var express = require('express')
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';
    var router = express.Router();
    //Register===============
    router.post('/regingredient', upload.single('avatar'), function(req, res) {
        var d = JSON.parse(req.body.data);
        pool.getConnection(function(err, connection) {
            connection.query("CALL InsertIngredient(?,?,?,?,?)",[d.ingredientName,d.photo,d.idRestaurant,d.stocks,d.price], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    //Update===========
    router.post('/updingredient', upload.single('avatar'), function(req, res) {
        var d = JSON.parse(req.body.data);
        pool.getConnection(function(err, connection) {
            connection.query("CALL UpdateIngredient(?,?,?,?,?,?)",[d.idIngredient,d.ingredientName,d.photo,d.idRestaurant,d.stocks,d.price], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    //view,delete=======
    router.post('/getingredientsbydishesbyrest', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query("CALL GetIngredientsFromDishesFromRestaurant(?)",[req.body.idRestaurant], function(err, rows) {
                if (err) throw err;
                for (var i = 0; i < rows[0].length; i++) {
                    var base64 = bufferToBase64(new Buffer(rows[0][i].photo));
                    rows[0][i].photo = base64;
                };
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    router.post('/getingredientsfromrest', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query("CALL GetIngredientsFromRestaurant(?)",[req.body.idRestaurant], function(err, rows) {
                if (err) throw err;
                for (var i = 0; i < rows[0].length; i++) {
                    var base64 = bufferToBase64(new Buffer(rows[0][i].photo));
                    rows[0][i].photo = base64;
                };
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    function bufferToBase64(buf) { //Buffer to base64
        var binstr = Array.prototype.map.call(buf, function(ch) {
            return String.fromCharCode(ch);
        }).join('');
        return binstr;
    }

    router.post('/deleteingredient', function(req, res) {
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