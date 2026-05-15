const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  courseId: { type: DataTypes.UUID, allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT },
  videoUrl: { type: DataTypes.STRING, allowNull: false },
  videoPublicId: { type: DataTypes.STRING },
  duration: { type: DataTypes.INTEGER, defaultValue: 0 },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
  isFree: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'lessons', timestamps: true });

module.exports = Lesson;