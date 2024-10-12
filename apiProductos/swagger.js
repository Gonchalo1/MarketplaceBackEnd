// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

// Definición de opciones de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Productos',
    version: '1.0.0',
    description: 'Documentación de la API de productos',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
};

// Opciones de Swagger JSDoc
const options = {
  swaggerDefinition,
  // Archivos donde se encuentran los comentarios de Swagger
  apis: [path.join(__dirname, '../routes/productRouter.js')], // Ajusta la ruta a tu archivo de rutas
};

// Generar el documento Swagger
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
