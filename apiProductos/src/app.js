// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Utiliza el puerto de las variables de entorno o el puerto 3000 por defecto

// Importar rutas
const productRoutes = require('../routes/productRouter');

app.get('/', (req, res) => {
  res.send('¡El servidor está funcionando!');
});
// Middleware para parsear JSON
app.use(express.json());

app.use( '/products' ,productRoutes);
app.use('/categories', productRoutes);
app.use('/tags', productRoutes);



// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
