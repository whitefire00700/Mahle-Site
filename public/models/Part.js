var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partSchema;
partSchema = new Schema({
        partno:String, //Part number
        partname:String, //Part Line Name
        partlineno: Number, // Part Line number
        parttraceno:String//Part traceability Number

}, {collection: 'part', versionKey: false});



//the schema is useless so far
//we need to create a model using it
var part = mongoose.model('part', partSchema);

//make this available to our users in our Node applications
module.exports = part;

