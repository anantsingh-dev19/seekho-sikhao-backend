const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  items: { type: DataTypes.JSON, allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'), defaultValue: 'pending' },
  paymentId: { type: DataTypes.STRING, allowNull: true },
  razorpayOrderId: { type: DataTypes.STRING, allowNull: true },
  shippingAddress: { type: DataTypes.JSON, allowNull: true },
  type: { type: DataTypes.ENUM('course', 'product', 'mixed'), defaultValue: 'product' },
}, { tableName: 'orders', timestamps: true });

module.exports = Order;