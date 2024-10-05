import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Inicializar Sequelize
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

// Ejemplo de ruta
app.get('/', (req, res) => {
  res.send('¡Hola, mundo con TypeScript!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
