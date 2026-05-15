const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discountPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  images: { type: DataTypes.JSON, defaultValue: [] },
  category: { type: DataTypes.STRING(100), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'products', timestamps: true });

module.exports = Product;