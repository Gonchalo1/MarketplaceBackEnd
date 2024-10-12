// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Asegúrate de que esto esté al principio

// Crear instancia de Sequelize usando variables de entorno
const sequelize = new Sequelize(
  'GrupoVerde',       // Nombre de la base de datos
  'postgres',         // Usuario
  'gatanovia',        // Contraseña
  {
    host: 'localhost', // Host de la base de datos
    dialect: 'postgres',       // Tipo de base de datos
    port: 5432,       // Puerto (5432 es el valor por defecto para PostgreSQL)
    logging: false            // Desactiva el logging (opcional)
  }
);

// Verifica la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
