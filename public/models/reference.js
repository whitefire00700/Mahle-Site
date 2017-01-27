var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actionSchema;
actionSchema = new Schema({
    Defect : {
       code:[String],// Defect name
       description:[String],// Defect Description
        subtype: {
              subtypeno:[String],//Defect subtype number
              subtypename:[String] //Defect subtype name
        }
        },
    Linetype : {
           linetypeno:[String],//Line type number in Line type master
           linetype:[String]   //Line type in line type master
           },
     Line: {
         lineno: Number,//Line master number
         linename:[String] //Line master name
     },
    Part : {
        partno:[String], //Part number
        partname:[String], //Part Line Name
        partlineno: Number, // Part Line number
        parttraceno:[String]//Part traceability Number
    },

    Rework: {
          bypart:[String], //classification by part
          bydefect:[String], //by defect
          SLA: Number,
          Comments: {
              remarks: [String],//Rework remarks
              comment1: [String],//Rework analysis 1
              comment2: [String],//Rework analysis 2
              Status:[String] // Rework Status
          }

    }
}, {collection: 'actions', versionKey: false});

//the schema is useless so far
//we need to create a model using it
var actions = mongoose.model('actions', actionSchema);

//make this available to our users in our Node applications
module.exports = actions;