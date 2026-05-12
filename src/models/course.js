const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('Course', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  thumbnail: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  discountPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  category: { type: DataTypes.STRING(100), allowNull: false },
  level: { type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'), defaultValue: 'beginner' },
  language: { type: DataTypes.STRING(50), defaultValue: 'Hindi' },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
  totalDuration: { type: DataTypes.INTEGER, defaultValue: 0 },
  totalLessons: { type: DataTypes.INTEGER, defaultValue: 0 },
  enrolledCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  instructorId: { type: DataTypes.UUID, allowNull: false },
}, { tableName: 'courses', timestamps: true });

module.exports = Course;