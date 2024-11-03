import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createConnection } from './database/Connection'; // Import the createConnection function
import router from './routes/routes';
import "./types/express";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middlewares
app.use(cors());
app.use(express.json());
app.use('/', router);

async function startServer() {
  try {
      const client = await createConnection();

      // Use the client to execute a sample query
      const result = await client.query('SELECT NOW()');
      console.log('Current time:', result.rows[0].now);

      // ... other database operations

      app.listen(port, () => {
          console.log(`Servidor corriendo en http://localhost:${port}`);
      });
  } catch (error) {
      console.error('Error connecting to database:', error);
  }
}

startServer();




