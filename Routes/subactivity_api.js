var express=require('express');
var router=express.Router();

require('../Database/config');
//require('./employee_api');
var SubActivity=require('../Database/subActivitySchema');

router.get('/GetAllSubActivities',function(req,resp,next){
    SubActivity.find({},function(err,docs){
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

router.post('/PostSubActivityNew',function(req,resp){
  var newCode=0;
  SubActivity.find({},function(err,docs){
      if (err) {
      resp.status(500).send(err)
  } else {
      if(docs.length==0)
      {
        console.log(" 0 length");
        newCode=1;
        postDetails(req,resp,newCode);
      }
      else {
        console.log("more length");
        newCode=docs[docs.length-1].SubActivityId+1;
      postDetails(req,resp,newCode);
        //console.log(docs.length);
      }
  }
});
// var model = new Project(req.body);
});

router.put('/UpdateSubActivity',function(req,resp){
  SubActivity.findOne({SubActivityId:req.query.id}, function(err, docs) {
    // Handle any possible database errors
    if (err) {
        resp.status(500).send(err);
    } else {
            docs.SubActivityName=req.body.SubActivityName,
            docs.SubActivityDesc=req.body.SubActivityDesc,
            docs.ActivityStartDate=req.body.ActivityStartDate,
            docs.SubActivityStartDate=req.body.SubActivityStartDate,
            docs.SubActivityEndDate=req.body.SubActivityEndDate,
            docs.SelectedMainActivity=req.body.SelectedMainActivity
          docs.save((err, docs) => {
            if (err) {
                resp.status(500).send(err)
            }
            resp.status(200).send(docs);
        });
    }
});
});

router.delete('/DeleteSubActivity',function(req,resp){
  SubActivity.findOneAndRemove({SubActivityId:req.query.id}, function(err, docs) {
    // Handle any possible database errors
    if (err) {
        resp.status(500).send(err);
    } else {
            resp.send(200);
    }
});
});

function postDetails(req,resp,newCode){
  var model=new SubActivity({
    SubActivityId : newCode,
    SubActivityName : req.body.SubActivityName,
    SubActivityDesc : req.body.SubActivityDesc,
    SubActivityStartDate : req.body.SubActivityStartDate,
    SubActivityEndDate : req.body.SubActivityEndDate,
    SelectedMainActivity:req.body.SelectedMainActivity
  })
    model.save({},function(err,docs){
          if (err) {
          // Note that this error doesn't mean nothing was found,
          // it means the database had an error while searching, hence the 500 status
          resp.status(500).send(err)
      } else {
          // send the list of all people
          //console.log(docs[0].ProjectCode);
          resp.status(200).send(docs);
      }
    });
}


 module.exports=router;
