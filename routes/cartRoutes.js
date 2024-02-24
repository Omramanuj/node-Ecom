const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Cart Management
 *     description: API endpoints for managing the user's shopping cart
 */

/**
 * @swagger
 * /{productId}:
 *   post:
 *     tags:
 *       - Cart Management
 *     summary: Add a product to the cart
 *     description: Adds a specified product to the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to add to the cart
 *     responses:
 *       201:
 *         description: Product added to cart successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Product not found.
 */
cartRouter.post('/:productId', authenticateUser, cartController.addToCart);

/**
 * @swagger
 * /viewCart:
 *   get:
 *     tags:
 *       - Cart Management
 *     summary: View the cart
 *     description: Retrieves the authenticated user's cart details.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully.
 *       404:
 *         description: Cart not found.
 */
cartRouter.get('/viewCart', authenticateUser, cartController.viewCart);

/**
 * @swagger
 * /deleteCart/{productId}:
 *   delete:
 *     tags:
 *       - Cart Management
 *     summary: Remove a product from the cart
 *     description: Removes a specified product from the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from the cart
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Product not found in cart.
 */
cartRouter.delete('/deleteCart/:productId', authenticateUser, cartController.removeFromCart);

module.exports = cartRouter;
