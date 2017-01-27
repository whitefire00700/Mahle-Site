var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var defectSchema;
defectSchema = new Schema({
   code:String,
    description:String,
    subtypeno:String,
    subtypename:String
}, {collection: 'defects', versionKey: false});



//the schema is useless so far
//we need to create a model using it
var defects = mongoose.model('defects', defectSchema);

//make this available to our users in our Node applications
module.exports = defects;