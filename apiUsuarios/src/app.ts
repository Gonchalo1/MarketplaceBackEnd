import express, { Application } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'; // Importamos los tipos de Sequelize

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const port: string | number = process.env.PORT || 3000; // El puerto puede ser un string o un número

// Importar Sequelize y el modelo de usuario
import sequelize from '../src/db/db'; // Asegúrate de que la ruta sea correcta
import User from '../src/models/userModel'; // Importar el modelo de usuario (ya tipado)

// Importar rutas
import userRoutes from './routes/userRouter'; // Asegúrate de que la ruta sea correcta

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas
app.use('/user', userRoutes);

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync({ force: false }) // Cambia force a true para forzar la sincronización (esto borrará los datos existentes)
  .then(() => {
    console.log('Database & tables created!');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err: Error) => { // Especificar que err es de tipo Error
    console.error('Unable to connect to the database:', err);
  });


  // Tengo que seguir configurando la migracion para la base de datos, porque no se que va en usuario jajaj, y luego tengo que tiapr todo, levnatar y testear.
  //Pausado hasta no tener el modelo de usuarios hecho