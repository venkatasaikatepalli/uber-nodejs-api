let router = require('express').Router();
var orderController = require('../controllers/AddressController');

router.route('/order').post(orderController.create).get(orderController.list);
router.route('/order/:id').get(orderController.retrieve).put(orderController.update).delete(orderController.delete);

module.exports = router;
