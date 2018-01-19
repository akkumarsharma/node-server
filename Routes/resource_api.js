var express=require('express');
var router=express.Router();

require('../Database/config');
//require('./employee_api');
var Resource=require('../Database/resourceSchema');

router.get('/GetAllResources',function(req,resp,next){
    Resource.find({},function(err,docs){
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

router.post('/PostResourceNew',function(req,resp){
  var newCode=0;
  Resource.find({},function(err,docs){
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
        newCode=docs[docs.length-1].ResourceId+1;
      postDetails(req,resp,newCode);
        //console.log(docs.length);
      }
  }
});
// var model = new Project(req.body);
});

function postDetails(req,resp,newCode){
  var model=new Resource({
    ResourceId: newCode,
    ResourceName: req.body.ResourceName,
    ResourceSupervisor: req.body.ResourceSupervisor,
    ResourceDOJ:req.body.ResourceDOJ,
    ResourceEmail:req.body.ResourceEmail,
    SGUniqueId:req.body.SGUniqueId
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

router.get('/GetResourceUniqueIdAvailability',function(req, res) {
  console.log(req.query.uniqueId);
Resource.findOne({ SGUniqueId: req.query.uniqueId }, function (err, user) {
  if (user) {
  res.status(200).send({error:'true'});
  }
  else{
      res.status(200).send({error:'false'});
  }});
});

 module.exports=router;
