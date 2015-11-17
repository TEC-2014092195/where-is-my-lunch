var express = require('express')
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

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
    return router;
};
