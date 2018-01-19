var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;
var User_Schema = new Schema({
    UserName: String,
    Password: String,
    Name: String,
    Email: String,
    hash: String,
    salt: String
});

User_Schema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

User_Schema.methods.validPassword = function(password) {
  console.log('UserName='+this.UserName);
  console.log('Password='+this.Password);
    console.log('Name='+this.Name);
      console.log('Email='+this.Email);
        console.log('hash='+this.hash);
          console.log('salt='+this.salt);
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

User_Schema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    UserName: this.UserName,
    Name: this.Name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

var User = mongoose.model('users', User_Schema);

 module.exports=User;
