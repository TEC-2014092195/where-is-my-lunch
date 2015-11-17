var express = require('express')
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.post('/getDishesFromRestaurant', function(req, res) {
        console.log(req.body);
        pool.getConnection(function(err, connection) {
            connection.query('CALL GetDishesFromRestaurant(?)', [req.body.idRestaurant], function(err, rows) {
                if (err) throw err;
                console.log(rows[0]);
                
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
    
    return router;
};
