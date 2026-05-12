const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// POST /auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken({ id: user.id, role: user.role });

    res.status(201).json({ success: true, token, data: user });
  } catch (err) {
    next(err);
  }
};

// POST /auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account deactivated' });
    }

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ success: true, token, data: user });
  } catch (err) {
    next(err);
  }
};

// GET /auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const decoded = await admin.auth().verifyIdToken(idToken);
    let user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      user = await User.create({
        name: decoded.name || 'Google User',
        email: decoded.email,
        password: Math.random().toString(36),
      });
    }
    const token = generateToken({ id: user.id, role: user.role });
    res.json({ success: true, token, data: user });
  } catch (err) { next(err); }
};

const phoneAuth = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const decoded = await admin.auth().verifyIdToken(idToken);
    const phoneEmail = decoded.phone_number + '@phone.app';
    let user = await User.findOne({ where: { email: phoneEmail } });
    if (!user) {
      user = await User.create({
        name: 'Phone User',
        email: phoneEmail,
        password: Math.random().toString(36),
      });
    }
    const token = generateToken({ id: user.id, role: user.role });
    res.json({ success: true, token, data: user });
  } catch (err) { next(err); }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    if (email && email !== user.email) {
      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ success: false, message: 'Email already in use by another account' });
    }
    
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};

const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.update({ role: req.body.role });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.update({ isActive: req.body.isActive });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

module.exports = { register, login, getMe, googleAuth, phoneAuth, updateProfile, getAllUsers, updateUserRole, updateUserStatus };