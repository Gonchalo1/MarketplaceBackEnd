import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME as string,      // Nombre de la base de datos
  process.env.DB_USER as string,      // Usuario
  process.env.DB_PASSWORD as string,  // Contraseña
  {
    host: process.env.DB_HOST,        // Host de la base de datos
    dialect: 'postgres',              // Cambia a 'mysql' si usas MySQL
    port: Number(process.env.DB_PORT) || 5432,  // Puerto (default de PostgreSQL)
    logging: false,                   // Puedes habilitar el logging si deseas ver las queries
  }
);

// Exportar la conexión de Sequelize
module.exports = sequelize;
