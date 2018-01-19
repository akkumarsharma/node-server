var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');


require('./config/passport');
// In above three line we import the required packages


var activity=require('./Routes/activity_api');
var user=require('./Routes/user_api');
var project=require('./Routes/project_api');
var resource=require('./Routes/resource_api');
var subactivity=require('./Routes/subactivity_api');
var projectresourceassignment=require('./Routes/projectResourceAssignment_api');

var port=4500;
var app=express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.set('etag', false);
// app.use(express.static(path.join(__dirname,'/client')));

// Defien the path for the static files like image, css and js files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// Define the middleware to parse the data from URL request and requesy body

// app.use('/',index);
app.use(passport.initialize());

app.use('/api/activity',activity);
app.use('/api/user',user);
app.use('/api/project',project);
app.use('/api/resource',resource);
app.use('/api/subactivity',subactivity);
app.use('/api/projectresourceassignments',projectresourceassignment);
// app.use('*',index);
// define the middleware for routing

app.listen(port,function(){
    console.log('Server Started At '+port);
})
