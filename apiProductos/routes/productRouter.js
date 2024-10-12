const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/autenticateToken');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener detalles de un producto específico
router.get('/:id', productController.getProductById);

// Crear un nuevo producto (requiere autenticación)
router.post('/', authMiddleware, productController.createProduct);

// Actualizar un producto existente (requiere autenticación)
router.put('/:id', authMiddleware, productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);



// Obtener todas las categorías
router.get('/', productController.getAllCategories);

// Crear una nueva categoría (requiere autenticación)
router.post('/',  productController.createCategory);

// Actualizar una categoría existente (requiere autenticación)
router.put('/:id', productController.updateCategory);

// Eliminar una categoría
router.delete('/:id', productController.deleteCategory);



// Obtener todas las etiquetas
router.get('/', productController.getAllTags);

// Crear una nueva etiqueta (requiere autenticación)
router.post('/', productController.createTag);

// Eliminar una etiqueta
router.delete('/:id', productController.deleteTag);


module.exports = router;
