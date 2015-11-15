var express = require('express');
var app = express();
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var mysql = require('mysql');

app.use(express.static('public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

var dbconfig = require('./config/database');
var pool = mysql.createPool(dbconfig.connection);


// routes ======================================================================
app.use(require('./app')(pool))

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
var server = app.listen(8080, function() {
    //var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://localhost:%s", port)

})
