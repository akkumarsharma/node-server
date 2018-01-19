var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubActivity_Schema = new Schema({
    SubActivityId: Number,
    SubActivityName: String,
    SubActivityDesc: String,
    ActivityStartDate:String,
    SubActivityStartDate:String,
    SubActivityEndDate:String,
    SelectedMainActivity:String
});

var SubActivity = mongoose.model('subactivities', SubActivity_Schema);

 module.exports=SubActivity;
