var express = require('express')
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.get('/unconfirmedpayments', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL GetUnconfirmedPayments()', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });

     router.post('/confirmpayment', function(req, res) {
        var d = JSON.parse(req.body.data);
        //res.send(data);
        pool.getConnection(function(err, connection) {
            connection.query("CALL AdminConfirmPayment(?)",[d.idPayment], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    return router;
};
