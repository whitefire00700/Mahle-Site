// server.js

// BASE SETUP
// =============================================================================

//Models
var User = require('./public/models/user');
var defects = require('./public/models/Defects');
var lineMaster = require('./public/models/LineMaster');
var lineType = require('./public/models/Linetype');
var part = require('./public/models/Part');
var rework = require('./public/models/Rework');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mahle');
//Check connections to DB
mongoose.connection.once('connected', function() {
    console.log("Connected to database")
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/adduser')

// create a User (accessed at POST http://localhost:8080/api/adduser)
    .post(function(req, res) {



        var user = new User(); // create a new instance of the User model
        user.UserId = req.body.UserId;  // set the User ID name (comes from the request)
        user.LoginId = req.body.LoginId;
        user.Password = req.body.Password;
        user.Role = req.body.Role;
        user.Name = req.body.Name;
        user.EmployeeID = req.body.EmployeeID;



        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });

    }); //end of add user Api


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
