var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectResourceAssignment_Schema = new Schema({
    ResourceAssignedId: Number,
    ProjectCode: String,
    ResourceId: String,
    AllocationPercentage:String,
    StartDate:String,
    EndDate:String,
    IsAllocation:String
});

var ProjectResourceAssignment = mongoose.model('projectresourceassignments', ProjectResourceAssignment_Schema);

 module.exports=ProjectResourceAssignment;
