var express=require('express');
var router=express.Router();

require('../Database/config');
//require('./employee_api');
var ProjectResourceAssignment=require('../Database/projectResourceAssignedSchema');

router.get('/GetAllProjectResourceAssigned',function(req,resp,next){
    ProjectResourceAssignment.find({},function(err,docs){
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

router.post('/PostProjectResourceAssigned',function(req,resp){
  var newCode=0;
  ProjectResourceAssignment.find({},function(err,docs){
      if (err) {
      resp.status(500).send(err)
  } else {
      if(docs.length==0)
      {
        newCode=1;
        postDetails(req,resp,newCode);
      }
      else {
        newCode=docs[docs.length-1].ResourceAssignedId+1;
      postDetails(req,resp,newCode);
      }
  }
});
});

router.put('/UpdateProjectResourceAssigned',function(req,resp){
  console.log('dude1'+req.query.id);
  ProjectResourceAssignment.findOne({ResourceAssignedId:req.query.id}, function(err, docs) {
    // Handle any possible database errors
    console.log(docs);
    if (err) {
      console.log('error occured'+err);
        resp.status(500).send(err);
    } else {
          docs.AllocationPercentage=req.body.AllocationPercentage,
          docs.StartDate=req.body.StartDate,
          docs.EndDate=req.body.EndDate,
          docs.IsAllocation=req.body.IsAllocation
          docs.save((err, docs) => {
            if (err) {
                resp.status(500).send(err)
            }
            resp.status(200).send(docs);
        });
    }
});
});

function postDetails(req,resp,newCode){
  var model=new ProjectResourceAssignment({
    ResourceAssignedId: newCode,
    ProjectCode: req.body.ProjectCode,
    ResourceId: req.body.ResourceId,
    AllocationPercentage:req.body.AllocationPercentage,
    StartDate:req.body.StartDate,
    EndDate:req.body.EndDate,
    IsAllocation:req.body.IsAllocation
  })
    model.save({},function(err,docs){
          if (err) {
          resp.status(500).send(err)
      } else {
          resp.status(200).send(docs);
      }
    });
}

 module.exports=router;
