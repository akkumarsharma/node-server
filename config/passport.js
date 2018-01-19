var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
// var User = mongoose.model('userSchema');
var User=require('../Database/userSchema');

passport.use(new LocalStrategy(
  function(UserName, Password, done) {
    console.log(Username +' & ' +Password);
    User.findOne({ UserName: Username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(Password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
