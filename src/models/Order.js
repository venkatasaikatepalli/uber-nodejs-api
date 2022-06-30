var mongoose = require('mongoose');
const Address = require('./Address');

var orderSchema = mongoose.Schema({
    customers: Object, // can be more than one
    driverId: String,
    pickAddress: Object,
    dropPoints: Object, // can be more than one
    orderType: String,
    status: String,
    orderDate: Date,
});

var Order = module.exports = mongoose.model('order', orderSchema);
