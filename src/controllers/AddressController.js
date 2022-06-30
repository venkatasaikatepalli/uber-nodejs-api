var Address = require('../models/Address');

exports.list = (req, res) => {
    Address.find({userId: req.user.userId}, function(err, result) {
        if(err) {
            res.status(500).send('Unable to process your request');
            return;
        }
        res.status(200).json(result);
    });
}

exports.retrieve = (req, res) => {
    Address.findById({_id: req.params.id}, function(err, result) {
        if(err) {
            res.status(500).send('Unable to process your request');
            return;
        }
        if(result) {
            res.status(200).json(result);
            return;
        }
        res.status(400).send('Address not found');
    });
}

exports.create = (req, res) => {
    const body = req.body;
    var address = new Address();
    address.userId = req.user.userId;
    address.label = body.label;
    address.address = body.address;
    address.city = body.city;
    address.landmark = body.landmark;
    address.pincode = body.pincode;
    address.locationType = body.locationType;
    address.geoLocation = body.geoLocation;
    address.createdDate = new Date();
    address.save(function(errI, resultI) {
        if(errI) {
            res.status(500).send('Unable to process your request');
            return;
        }
        res.status(200).json({
            status: 'Address Created sucessfully'
        })
    });
}

exports.update = (req, res) => {
    Address.findById({_id: req.params.id}, function(err, address) {
        if(err) {
            res.status(500).send('Unable to process your request');
            return;
        }
        const body = req.body;
        address.userId = body.userId;
        address.label = body.label;
        address.address = body.address;
        address.city = body.city;
        address.landmark = body.landmark;
        address.pincode = body.pincode;
        address.locationType = body.locationType;
        address.geoLocation = body.geoLocation;
        address.createdDate = new Date();
        address.save(function(errI, resultI) {
            if(errI) {
                res.status(500).send('Unable to process your request');
                return;
            }
            res.status(200).json({
                status: 'Address updated sucessfully'
            })
        });
    });
}

exports.delete = (req, res) => {
    Address.remove({_id: req.params.id}, function(err, result) {
        if(err) {
            res.status(500).send('Unable to process your request');
            return;
        }
        res.status(200).send('Address deleted sucessfully');
    });
}