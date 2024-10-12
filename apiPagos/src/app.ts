// Importaciones
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import pagoRoute from './routes/pagoRoute';
import reembolsoRoute from './routes/reembolsoRoute';
import { testConnection } from './db/db';

dotenv.config(); // Cargar las variables de entorno


// Crear una instancia de Express
const app = express();

// Configurar el middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijos para las rutas de pagos y reembolsos
app.use('/api', pagoRoute, reembolsoRoute);

// Configurar una ruta básica
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo xd!');
});

// Servir archivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el puerto y escuchar peticiones
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  
  // Probar la conexión a la base de datos
  await testConnection();
});

// Manejo de errores de ruta no encontrada
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Página no encontrada');
});

// Manejo de errores del servidor
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

// Comentarios adicionales
// Hice todo, nomás no se puede hacer el reembolso porque hay que poner datos reales y hacer un pago real, cosa que se supone que no tenemos que hacerlo
// Así que estoy limitado por hacer proyectos ficticios, igualmente el resto de las funcionalidades están terminadas, así que mi trabajo termina aquí.
// La petición se manda de manera manual, pasando en los headers el token y la llave para no repetir la petición (X-idempotency-key) y se pasa el id del pedido en la url (se saca ese id por la base de datos)


// Me olvidé que tenia que hacerlo con checkout api xd, no se porqué pero no me deja levantarlo por una funcion que esta mal al momento de compilar ocn tsc, una vez resuelva eso hay que testear.
