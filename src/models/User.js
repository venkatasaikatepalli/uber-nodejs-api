var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    mobile: String,
    userType: String,
    createdDate: Date,
});

var User = module.exports = mongoose.model('user', userSchema);
