/**
 * Created by sylvester on 27/01/17.
 */
//grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var userSchema;
userSchema = new Schema({
    UserId: String,
    LoginId: String,
    Password: String,
    Role: String,
    Name: String,
    EmployeeID: String
}, {collection: 'user', versionKey: false});

//the schema is useless so far
//we need to create a model using it
var user = mongoose.model('user', userSchema);

//make this available to our users in our Node applications
module.exports = user;