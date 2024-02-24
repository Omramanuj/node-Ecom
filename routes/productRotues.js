const express = require('express');
const productRouter = express.Router();
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');
const { createProduct, updateProduct, deleteProduct, getProducts, findProductsByCategory } = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   - name: Product Management
 *     description: API endpoints for managing products
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Product Management
 *     summary: Get all products
 *     description: Retrieves a list of all products. Requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products.
 *       401:
 *         description: Unauthorized. User not authenticated.
 */
productRouter.get('/', authenticateUser, getProducts);

/**
 * @swagger
 * /category/{categoryName}:
 *   get:
 *     tags:
 *       - Product Management
 *     summary: Find products by category
 *     description: Retrieves a list of products by category name.
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the category
 *     responses:
 *       200:
 *         description: A list of products in the specified category.
 *       404:
 *         description: Category not found.
 */
productRouter.get('/category/:categoryName', findProductsByCategory);

/**
 * @swagger
 * /addProduct:
 *   post:
 *     tags:
 *       - Product Management
 *     summary: Create a new product
 *     description: Adds a new product to the store. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       403:
 *         description: Forbidden. User not an admin.
 */
productRouter.post('/addProduct', isAdmin, createProduct);

/**
 * @swagger
 * /updateProduct/{productId}:
 *   put:
 *     tags:
 *       - Product Management
 *     summary: Update a product
 *     description: Updates an existing product details. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       403:
 *         description: Forbidden. User not an admin.
 */
productRouter.put('/updateProduct/:productId', isAdmin, updateProduct);

/**
 * @swagger
 * /deleteProduct/{productId}:
 *   delete:
 *     tags:
 *       - Product Management
 *     summary: Delete a product
 *     description: Deletes a product from the store. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       403:
 *         description: Forbidden. User not an admin.
 */
productRouter.delete('/deleteProduct/:productId', isAdmin, deleteProduct);

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
 *           format: int64
 *           description: The unique identifier of the product.
 *         name:
 *           type: string
 *           description: The name of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         categoryId:
 *           type: integer
 *           description: The category ID the product belongs to.
 *         available:
 *           type: boolean
 *           description: Availability status of the product.
 *       example:
 *         id: 1
 *         name: "Awesome Widget"
 *         price: 49.99
 *         description: "A really awesome widget for all your widgety needs."
 *         categoryId: 10
 *         available: true
 */

module.exports = productRouter;
