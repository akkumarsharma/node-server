var mongoose = require('mongoose');
// Connection URL
var db = 'mongodb://localhost:27017/MasterDbPm';
    // Use connect method to connect to the Server
 mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    }
});
