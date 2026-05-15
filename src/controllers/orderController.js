const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, shippingAddress, type } = req.body;
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });
    const order = await Order.create({
      userId: req.user.id, items, totalAmount, shippingAddress, type,
      razorpayOrderId: razorpayOrder.id,
    });
    res.status(201).json({ success: true, data: { order, razorpayOrder } });
  } catch (err) { next(err); }
};

// Verify payment
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(sign).digest('hex');
    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
    const order = await Order.findByPk(orderId);
    await order.update({ status: 'paid', paymentId: razorpay_payment_id });
    res.json({ success: true, message: 'Payment verified', data: order });
  } catch (err) { next(err); }
};

// Get my orders
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: orders });
  } catch (err) { next(err); }
};

// ADMIN - Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: orders });
  } catch (err) { next(err); }
};

module.exports = { createOrder, verifyPayment, getMyOrders, getAllOrders };