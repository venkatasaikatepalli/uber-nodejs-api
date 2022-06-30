var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    userId: String,
    label: String,
    address: String,
    city: String,
    landmark: String,
    pincode: Number,
    locationType: String,
    geoLocation: Object,
    createdDate: Date,
});

var Address = module.exports = mongoose.model('address', addressSchema);
