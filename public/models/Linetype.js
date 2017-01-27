var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lineTypeSchema;
lineTypeSchema = new Schema({
        linetypeno: String,//Line type number in Line type master
        linetype: String   //Line type in line type master

}, {collection: 'linetype', versionKey: false});



//the schema is useless so far
//we need to create a model using it
var linetype = mongoose.model('linetype', lineTypeSchema);

//make this available to our users in our Node applications
module.exports = linetype;

