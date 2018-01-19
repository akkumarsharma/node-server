var express=require('express');
var router=express.Router();

require('../Database/config');
//require('./employee_api');
var Project=require('../Database/projectSchema');

router.get('/GetAllProjects',function(req,resp,next){
    Project.find({},function(err,docs){
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

router.post('/PostProjectNew',function(req,resp){
  var newCode=0;
  Project.find({},function(err,docs){
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
        newCode=docs[docs.length-1].ProjectCode+1;
      postDetails(req,resp,newCode);
        //console.log(docs.length);
      }
  }
});
// var model = new Project(req.body);
});

function postDetails(req,resp,newCode){
  var model=new Project({
    ProjectCode: newCode,
    ProjectName: req.body.ProjectName,
    ProjectDesc: req.body.ProjectDesc,
    ProjectStartDate:req.body.ProjectStartDate,
    ProjectEndDate:req.body.ProjectEndDate
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
