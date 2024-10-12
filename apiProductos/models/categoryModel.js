// models/categoryModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Category',
  timestamps: false
});

module.exports = Category;
