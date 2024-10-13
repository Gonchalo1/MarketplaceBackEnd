import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno al principio

// Crear instancia de Sequelize usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME || 'UsuariosMarketplace',   // Nombre de la base de datos
  process.env.DB_USER || 'postgres',         // Usuario
  process.env.DB_PASSWORD || '',    // Contraseña
  {
    host: process.env.DB_HOST || 'localhost', // Host de la base de datos
    dialect: 'postgres',                      // Tipo de base de datos
    port: Number(process.env.DB_PORT) || 5432, // Puerto (5432 es el valor por defecto para PostgreSQL)
    logging: false                            // Desactiva el logging (opcional)
  }
);

// Verifica la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
