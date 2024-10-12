// models/tagModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Tag',
  timestamps: false
});

module.exports = Tag;
