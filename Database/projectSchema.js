var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project_Schema = new Schema({
    ProjectCode: Number,
    ProjectName: String,
    ProjectDesc: String,
    ProjectStartDate:String,
    ProjectEndDate:String
});

var Project = mongoose.model('projects', Project_Schema);

 module.exports=Project;
