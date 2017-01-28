// server.js

// BASE SETUP
// =============================================================================

//Models
var User = require('./public/models/user');
var defects = require('./public/models/Defects');
var defectsubtype = require('./public/models/defectsubtype');
var lineMaster = require('./public/models/LineMaster');
var lineType = require('./public/models/Linetype');
var Part = require('./public/models/Part');
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


// =============================================================================

//create a new instance of all models

var user = new User();
var defect = new defects();
var defectst =new defectsubtype();
var linemaster= new lineMaster();
var linetype = new lineType();
var part = new Part();
var rwk = new rework();

// =============================================================================

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    console.log(req.method, req.url);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// create a User (accessed at POST http://localhost:8080/api/user)

router.post('/user/adduser',function(req, res) {
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



}); //End of create User Api

//Start of Edit/Update User
router.put('/user/edituser/:user_id',function(req, res) {

    // use our bear model to find the bear we want
    User.findById(req.params.user_id, function (err,user ) {

        if (err)
            res.send(err);
        user.UserId = req.body.UserId;  // update the User's info
        user.LoginId = req.body.LoginId;
        user.Password = req.body.Password;
        user.Role = req.body.Role;
        user.Name = req.body.Name;
        user.EmployeeID = req.body.EmployeeID;

        // save the user
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'User updated!'});
        });

    });

}); //End of Edit/Update User

//Start of Delete User

router.delete('/user/deleteuser/:user_id',function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

// Start of Create Defect Api

router.post('/defect/adddefect',function(req, res) {
    defect.code = req.body.code;  // set the Defect ID number (comes from the request)
    defect.description = req.body.description;
    // save the user and check for errors
    defect.save(function (err) {
        if (err)
            res.send(err);
        res.json({message: 'Defect Added'});
    });
}); //End of Create Defect Api

//Start of Edit/Update defect api
router.put('/defect/editdefect/:defect_id',function(req, res) {

    // use our User model to find the User we want
    defects.findById(req.params.defect_id, function (err,defect ) {

        if (err)
            res.send(err);
        defect.code = req.body.code;  // update the User's info
        defect.description = req.body.description;

        // save the user
        defect.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Defect edited!'});
        });

    });

});

//Start of remove defect api

router.delete('/defect/deletedefect/:defect_id',function(req, res) {
    defects.remove({
        _id: req.params.defect_id
    }, function(err, defect) {
        if (err)
            res.send(err);

        res.json({ message: 'Defect successfully deleted' });
    });
}); //End of Delete Defect.

//Start of create defect sub type

router.post('/defectsubtype/adddefect',function(req, res) {
    defectst.subtypeno = req.body.subtypeno;  // set the Defect ID number (comes from the request)
    defectst.subtypename = req.body.subtypename;
    // save the user and check for errors
    defectst.save(function (err) {
        if (err)
            res.send(err);
        res.json({message: 'Defect Subtype Added'});
    });
}); //End of Create Defect sub type  Api


//Start of Update/Edit Defect Subtype
router.put('/defectsubtype/editdefect/:defectst_id',function(req, res) {

    // use our User model to find the User we want
    defectsubtype.findById(req.params.defectst_id, function (err,defectst ) {

        if (err)
            res.send(err);
        defectst.subtypeno = req.body.subtypeno;  // update the User's info
        defectst.subtypename = req.body.subtypename;

        // save the user
        defectst.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Defect Subtype edited!'});
        });

    });

}); //End of Edit Defect Subtype


//Delete defect Subtype

router.delete('/defectsubtype/deletedefect/:defectst_id',function(req, res) {
    defectsubtype.remove({
        _id: req.params.defectst_id
    }, function(err, defectst) {
        if (err)
            res.send(err);

        res.json({ message: 'Defect SubType successfully deleted' });
    });
}); //End of Delete Defect Subtype




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
