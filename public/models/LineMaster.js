var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lineMasterSchema;
lineMasterSchema = new Schema({
    Line: {
        lineno: Number,//Line master number
        linename:String //Line master name
    }

}, {collection: 'line', versionKey: false});



//the schema is useless so far
//we need to create a model using it
var line = mongoose.model('line', lineMasterSchema);

//make this available to our users in our Node applications
module.exports = line;


