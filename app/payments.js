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

    router.post('/newpayment', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('SELECT NewPayment(?,?,?) AS generatedPay', [req.body.typePayment, req.body.idRestaurant, req.body.idUser], function(err, rows) {
                if (err) throw err;
                console.log(rows[0]);
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    router.post('/addDish', function(req, res) {
        // res.send(req.body);
        


        pool.getConnection(function(err, connection) {
            for (var i = 0; i < req.body.dishes.length; i++) {
                connection.query('CALL AddDish(?,?,?)', [req.body.dishes[i].idDish, req.body.idPayment, req.body.dishes[i].quantity], function(err, rows) {
                    if (err) throw err;
                    //res.send(rows[0]);
                    status = rows[0];

                });
            }
            res.send("listo");
            connection.release();
        });

    });
    router.post('/completepayment', function(req, res) {
        // res.send(req.body);
        pool.getConnection(function(err, connection) {
            connection.query('CALL CompletePayment(?)', [req.body.idPayment], function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    router.post('/confirmpayment', function(req, res) {
        
        //res.send(req.body);
        pool.getConnection(function(err, connection) {
            connection.query("CALL AdminConfirmPayment(?)", [req.body.idPayment], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    router.post('/consultingredient', function(req, res) {
        var d = req.body;
        pool.getConnection(function(err, connection) {
            connection.query("CALL ConsultIngredient(?,?,?,?)", [d.ingredientName, d.idRestaurant, d.iniDate, d.finDate], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    return router;
};
