var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reworkSchema;
reworkSchema = new Schema({
       bypart:String, //classification by part
       bydefect:String, //by defect
       SLA: Number,
       remarks: String,//Rework remarks
       comment1: String,//Rework analysis 1
       comment2: String,//Rework analysis 2
       Status:String // Rework Status


}, {collection: 'rework', versionKey: false});



//the schema is useless so far
//we need to create a model using it
var rework = mongoose.model('rework', reworkSchema);

//make this available to our users in our Node applications
module.exports = rework;

