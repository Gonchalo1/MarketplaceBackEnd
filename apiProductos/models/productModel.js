// models/productModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Category = require('./categoryModel'); // Importar el modelo Category

const Product = sequelize.define('Product', {
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
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  image_url: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'Product',
  timestamps: false
});

module.exports = Product;
