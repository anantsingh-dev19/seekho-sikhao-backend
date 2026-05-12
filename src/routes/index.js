const router = require('express').Router();
const authRoutes = require('./auth');

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);

router.use('/courses', require('./courses'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/upload', require('./upload'));

module.exports = router;
