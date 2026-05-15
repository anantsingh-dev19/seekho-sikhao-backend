const router = require('express').Router();
const { register, login, getMe, googleAuth, phoneAuth, updateProfile, getAllUsers, updateUserRole, updateUserStatus } = require('../controllers/authController');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
];

const loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

router.post('/register', registerRules, register);
router.post('/login', loginRules, login);
router.get('/me', authenticate, getMe);
router.post('/google', googleAuth);
router.post('/phone', phoneAuth);
router.put('/update-profile', authenticate, updateProfile);
router.get('/users', authenticate, isAdmin, getAllUsers);
router.put('/users/:id/role', authenticate, isAdmin, updateUserRole);
router.put('/users/:id/status', authenticate, isAdmin, updateUserStatus);

module.exports = router;