/**
 * 
 */
var express = require("express");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var mongoose = require('mongoose');

// pull information from html in POST
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());
app.use(methodOverride()); // simulate DELETE and PUT

var router = express.Router();
router.route("/").get(function(req, res) {
    res.send("Hello world!");
});

var routes = require('./routes/tvshows')(router);

app.use("/api/v1/", router);

mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});

app.listen(3001, function() {
    console.log("Node server running on http://localhost:3001");
});
