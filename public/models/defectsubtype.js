
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var defectsubtypeSchema;
defectsubtypeSchema = new Schema({
    subtypeno:String,
    subtypename:String
}, {collection: 'defectsubtype', versionKey: false});



//the schema is useless so far
//we need to create a model using it
var defectsubtype = mongoose.model('defectsubtype', defectsubtypeSchema);

//make this available to our users in our Node applications
module.exports = defectsubtype;