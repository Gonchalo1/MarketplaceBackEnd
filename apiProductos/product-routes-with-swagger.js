const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado del producto
 *         name:
 *           type: string
 *           description: El nombre del producto
 *         description:
 *           type: string
 *           description: La descripción del producto
 *         price:
 *           type: number
 *           description: El precio del producto
 *         category_id:
 *           type: integer
 *           description: El ID de la categoría del producto
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas asociadas al producto
 *         stock:
 *           type: integer
 *           description: Cantidad en stock del producto
 *         image_url:
 *           type: string
 *           description: URL de la imagen del producto
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna la lista de todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: La lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: El producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: El producto no fue encontrado
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: El producto fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Algunos de los datos proporcionados no son válidos
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Actualiza un producto por su id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del producto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: El producto fue actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: El producto no fue encontrado
 *      400:
 *        description: Algunos de los datos proporcionados no son válidos
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: El producto fue eliminado
 *       404:
 *         description: El producto no fue encontrado
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
