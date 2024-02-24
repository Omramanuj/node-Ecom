const express = require('express');
const categoryRouter = express.Router();

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
} = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   - name: Category Management
 *     description: API endpoints for managing categories
 */

/**
 * @swagger
 * /addCategory:
 *   post:
 *     tags:
 *       - Category Management
 *     summary: Create a new category
 *     description: Add a new category to the e-commerce platform.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Bad request.
 */
categoryRouter.post('/addCategory', createCategory);

/**
 * @swagger
 * /list:
 *   get:
 *     tags:
 *       - Category Management
 *     summary: List all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */
categoryRouter.get('/list', getCategories);

/**
 * @swagger
 * /updateCategory/{categoryId}:
 *   put:
 *     tags:
 *       - Category Management
 *     summary: Update a category
 *     description: Update the details of an existing category.
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: The ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Category not found.
 */
categoryRouter.put('/updateCategory/:categoryId', updateCategory);

/**
 * @swagger
 * /deleteCategory/{categoryId}:
 *   delete:
 *     tags:
 *       - Category Management
 *     summary: Delete a category
 *     description: Remove an existing category from the e-commerce platform.
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Category not found.
 */
categoryRouter.delete('/deleteCategory/:categoryId', deleteCategory);

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 *       example:
 *         id: 1
 *         name: Electronics
 */

module.exports = categoryRouter;
