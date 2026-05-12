const router = require('express').Router();
const { createOrder, verifyPayment, getMyOrders, getAllOrders } = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

router.post('/', authenticate, createOrder);
router.post('/verify', authenticate, verifyPayment);
router.get('/my', authenticate, getMyOrders);
router.get('/all', authenticate, isAdmin, getAllOrders);

module.exports = router;