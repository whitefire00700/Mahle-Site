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
var linems= new lineMaster();
var linetms = new lineType();
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

//Line master API

// Create Line master

router.post('/linemaster/addline',function(req, res) {
    linems.lineno = req.body.lineno;  // set the User ID name (comes from the request)
    linems.linename = req.body.linename;
    // save the user and check for errors
    linems.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Line Master added!' });
    });
}); //end create line master

//Start of Update/Edit Defect Subtype
router.put('/linemaster/editline/:linems_id',function(req, res) {

    // use our User model to find the User we want
    lineMaster.findById(req.params.linems_id, function (err,linems ) {

        if (err)
            res.send(err);
        linems.lineno = req.body.lineno;  // set the User ID name (comes from the request)
        linems.linename = req.body.linename;

        // save the user
        linems.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Line Type successfully edited!'});
        });

    });

}); //End of linemaster

//Delete defect Subtype

router.delete('/linemaster/deleteline/:linems_id',function(req, res) {
    lineMaster.remove({
        _id: req.params.linems_id
    }, function(err, linems) {
        if (err)
            res.send(err);

        res.json({ message: 'Line successfully deleted' });
    });
}); //End of Delete line master


//Start of linetypemaster

router.post('/linetypemaster/addlinetype',function(req, res) {
    linetms.linetypeno = req.body.linetypeno;  // set the User ID name (comes from the request)
    linetms.linetypename = req.body.linetypename;
    // save the user and check for errors
    linetms.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Line type Master added!' });
    });
}); //end of create line type master


//Start of Update/Edit linetypemaster
router.put('/linetypemaster/editlinetype/:linetms_id',function(req, res) {

    // use our User model to find the User we want
    lineType.findById(req.params.linetms_id, function (err,linetms) {

        if (err)
            res.send(err);
        linetms.linetypeno = req.body.linetypeno;  // set the User ID name (comes from the request)
        linetms.linetypename = req.body.linetypename;

        // save the user
        linetms.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Line Type successfully edited!'});
        });

    });

}); //End of update linemaster

//Delete linemaster Subtype

router.delete('/linetypemaster/deletelinetype/:linetms_id',function(req, res) {
    lineType.remove({
        _id: req.params.linetms_id
    }, function(err, linetms) {
        if (err)
            res.send(err);

        res.json({ message: 'Line type successfully deleted' });
    });
}); //End of Delete line master


//Part master

// Adding a part


router.post('/part/addpart',function(req, res) {
    part.partno = req.body.partno;  // set the User ID name (comes from the request)
    part.partname = req.body.partname;
    part.partlineno = req.body.partlineno;
    part.parttraceno= req.body.parttraceno;
    // save the user and check for errors
    part.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Part added!' });
    });
}); //end of create part


//Start of Update/Edit part
router.put('/part/editpart/:part_id',function(req, res) {

    // use our User model to find the User we want
    Part.findById(req.params.part_id, function (err,part) {

        if (err)
            res.send(err);
        part.partno = req.body.partno;  // set the User ID name (comes from the request)
        part.partname = req.body.partname;
        part.partlineno = req.body.partlineno;
        part.parttraceno= req.body.parttraceno;

        // save the user
        part.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'part details edited!'});
        });

    });

}); //End of update part master

//Delete part master

router.delete('/part/deletepart/:part_id',function(req, res) {
    Part.remove({
        _id: req.params.part_id
    }, function(err, part) {
        if (err)
            res.send(err);

        res.json({ message: 'Part successfully deleted' });
    });
}); //End of Delete part master


//Rework master

// Add Rework summary

router.post('/rework/addrework',function(req, res) {
    rwk.bypart = req.body.bypart;  // set the User ID name (comes from the request)
    rwk.bydefect = req.body.bydefect;
     rwk,SLA = req.body.SLA;
    rwk.remark= req.body.remark;
     rwk.comment1=req.body.comment1;
     rwk.comment2=req.body.comment2;
    rwk.Status=req.body.Status;
    // save the user and check for errors
    rwk.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Rework summary added!' });
    });
}); //end of rework part


//Start of Update/Edit rework
router.put('/rework/editrework/:rwk_id',function(req, res) {

    // use our User model to find the User we want
    rework.findById(req.params.rwk_id, function (err,rwk) {

        if (err)
            res.send(err);
        rwk.bypart = req.body.bypart;  // set the User ID name (comes from the request)
        rwk.bydefect = req.body.bydefect;
        rwk,SLA = req.body.SLA;
        rwk.remark= req.body.remark;
        rwk.comment1=req.body.comment1;
        rwk.comment2=req.body.comment2;
        rwk.Status=req.body.Status;

        // save the user
        rwk.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Rework Summary edited!'});
        });

    });

}); //End of update part master

//Delete part master

router.delete('/rework/deleterework/:rwk_id',function(req, res) {
    rework.remove({
        _id: req.params.rwk_id
    }, function(err, rwk) {
        if (err)
            res.send(err);

        res.json({ message: 'Rework summary successfully deleted' });
    });
}); //End of Delete rework master
//COMPLETED ALL BASIC ACTIONS

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
