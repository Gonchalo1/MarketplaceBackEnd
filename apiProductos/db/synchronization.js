// db/synchronization.js
const sequelize = require('./db');
require('../models/index');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });
