var Order = require('../models/Order');
const { hashPassword, signJWT } = require('../util/jwt');

exports.signup = (req, res) => {
    const body = req.body;
    User.find({mobile: body.mobile}, function(err, result) {
        if(err) {
            res.status(500).send('Unable to process your request');
            return;
        }
        if(result && result.length > 0) {
            res.status(400).json({
                mobile: 'User already exist with mobile number'
            });
            return;
        } else {
            var user = new User();
            user.first_name = body.first_name;
            user.last_name = body.last_name;
            user.email = body.email;
            user.mobile = body.mobile;
            user.password = hashPassword(body.password);
            user.save(function(errI, resultI) {
                if(errI) {
                    res.status(500).send('Unable to process your request');
                    return;
                }
                res.status(200).json({
                    status: 'User Created sucessfully'
                })
            });
        }
    });
}

exports.login = (req, res) => {
    const body = req.body;
    User.find({mobile: body.mobile, password: hashPassword(body.password)}, async function(err, result) {
        if(err) {
            res.status(500).send('Unable to process your request');
            return;
        }
        if(result && result.length > 0) {
            res.status(400).json({
                message: 'Invalid Credentials'
            });
            return;
        } else {
            var token = await signJWT(result);
            res.status(200).json({token, user:result});
        }
    });
}