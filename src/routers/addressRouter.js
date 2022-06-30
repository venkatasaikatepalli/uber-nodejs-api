let router = require('express').Router();
var addressController = require('../controllers/AddressController');

router.route('/address').post(addressController.create).get(addressController.list);
router.route('/address/:id').get(addressController.retrieve).put(addressController.update).delete(addressController.delete);

module.exports = router;
