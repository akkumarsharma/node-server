var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Activity_Schema = new Schema({
    ActivityId: Number,
    ActivityName: String,
    ActivityDesc: String,
    ActivityStartDate:String,
    ActivityEndDate:String,
    ProjectCode:String,
    ProjectName:String
});

var Activity = mongoose.model('activities', Activity_Schema);

 module.exports=Activity;
