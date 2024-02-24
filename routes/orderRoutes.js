const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Order Management
 *     description: API endpoints for managing orders
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Order Management
 *     summary: Place an order
 *     description: Creates an order for the authenticated user with the items in their cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: Bad request if the cart is empty or other required conditions are not met.
 */
orderRouter.post('/', authenticateUser, orderController.placeOrder);

/**
 * @swagger
 * /orderHistory:
 *   get:
 *     tags:
 *       - Order Management
 *     summary: Get order history
 *     description: Retrieves the order history for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history retrieved successfully.
 *       404:
 *         description: Order history not found for the user.
 */
orderRouter.get('/orderHistory', authenticateUser, orderController.orderHistory);

/**
 * @swagger
 * /orderDetails/{orderId}:
 *   get:
 *     tags:
 *       - Order Management
 *     summary: Get order details
 *     description: Retrieves the details of a specific order for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to retrieve details for
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *       404:
 *         description: Order not found.
 */
orderRouter.get('/orderDetails/:orderId', authenticateUser, orderController.orderDetails);

module.exports = orderRouter;
