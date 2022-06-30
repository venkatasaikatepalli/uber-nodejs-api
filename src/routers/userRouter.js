let router = require('express').Router();
var userController = require('../controllers/UserController');

router.route('/signup').post(userController.signup);
router.route('/signin').post(userController.login);

module.exports = router;
