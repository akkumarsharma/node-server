var express=require('express');
var router=express.Router();

require('../Database/config');
//require('./employee_api');
var Activity=require('../Database/activitySchema');

router.get('/GetAllActivities',function(req,resp,next){
    Activity.find({},function(err,docs){
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        resp.status(500).send(err)
    } else {
        // send the list of all people
        resp.status(200).send(docs);
    }
  });
});

router.post('/PostActivityNew',function(req,resp){
  // model.ActivityId = req.body.ActivityId;
  // model.ActivityName = req.body.ActivityName;
  // model.ActivityDesc = req.body.ActivityDesc;
  // model.ActivityStartDate = req.body.ActivityStartDate;
  // model.ActivityEndDate = req.body.ActivityEndDate;
  // model.ProjectCode = req.body.ProjectCode;
  // model.ProjectName = req.body.ProjectName;
  var newCode=0;
  Activity.find({},function(err,docs){
      if (err) {
      resp.status(500).send(err)
  } else {
      if(docs.length==0)
      {
        newCode=1;
        postDetails(req,resp,newCode);
      }
      else {
        newCode=docs[docs.length-1].ActivityId+1;
      postDetails(req,resp,newCode);
        //console.log(docs.length);
      }
  }
});
// var model = new Project(req.body);
});

function postDetails(req,resp,newCode){
  var model=new Activity({
    ActivityId : newCode,
    ActivityName : req.body.ActivityName,
    ActivityDesc : req.body.ActivityDesc,
    ActivityStartDate : req.body.ActivityStartDate,
    ActivityEndDate : req.body.ActivityEndDate,
    ProjectCode : req.body.ProjectCode,
    ProjectName : req.body.ProjectName
  })
    model.save({},function(err,docs){
          if (err) {
          // Note that this error doesn't mean nothing was found,
          // it means the database had an error while searching, hence the 500 status
          resp.status(500).send(err)
      } else {
          // send the list of all people
          resp.status(200).send({ActivityId:newCode});
      }
    });
}

 module.exports=router;
