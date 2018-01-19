var express=require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var router=express.Router();

require('../Database/config');
//require('./employee_api');
var User=require('../Database/userSchema');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

router.post('/PostUserRegister',function(req, res) {
  var user = new User();
  user.UserName = req.body.UserName;
  user.Name = req.body.Name;
  user.Email = req.body.Email;
  //user.email = req.body.email;
  user.setPassword(req.body.Password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

});

router.get('/GetUserAvailableity',function(req, res) {
  console.log(req.query.username);
User.findOne({ UserName: req.query.username }, function (err, user) {
  if (user) {
  res.status(200).send({error:'true'});
  }
  else{
      res.status(200).send({error:'false'});
  }});
});

router.post('/PostUserlogin',function(req,res){
  User.findOne({ UserName: req.body.UserName }, function (err, user) {
    // if (err) { return done(err); }
    // Return if user not found in database
    if (!user) {
    res.status(200).send({error:'User does not exist'});
    }
  else if(user){
    if (user.validPassword(req.body.Password)) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    }
  else{
      res.status(200).send({error:'Password is wrong!!'});
  }}
    else{
      res.status(200).send({error:'Something is wrong!!'});
    }
  })


});

 module.exports=router;
 //   User.findOne({UserName:req.body.UserName,Password:req.body.Password},function(err,docs){
 //     console.log(docs);
 //       if (err) {
 //       resp.status(500).send(err)
 //   } else if(docs !=null) {
 //       resp.send(200);
 //   }
 //     else{
 //         resp.send(204);
 //     }});
 // }
 //console.log(req.body);



 ///

 // if(!req.body.email || !req.body.password) {
   //   sendJSONresponse(res, 400, {
   //     "message": "All fields required"
   //   });
   //   return;
   // }





 // passport.authenticate('local', function(err, user, info){
 //   var token;
 //
 //   // If Passport throws/catches an error
 //   // console.log('user='+user);
 //   if (err) {
 //     res.status(404).json(err);
 //     return;
 //   }
 //
 //   // If a user is found
 //   if(user){
 //     token = user.generateJwt();
 //     res.status(200);
 //     res.json({
 //       "token" : token
 //     });
 //   } else {
 //     // If user is not found
 //     res.status(401).json(info);
 //   }
 // })(req, res);
