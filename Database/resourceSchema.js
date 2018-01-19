var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Resource_Schema = new Schema({
    ResourceId: Number,
    ResourceName: String,
    ResourceSupervisor: String,
    ResourceDOJ:String,
    ResourceEmail:String,
    SGUniqueId:String
});

var Resource = mongoose.model('resources', Resource_Schema);

 module.exports=Resource;
