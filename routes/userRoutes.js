const express = require('express');
const { signUp, login, list } = require('../controllers/userController');
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');
const userRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management and login
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.
 */
userRoutes.post('/signup', signUp);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticates a user
 *     description: Logs in a user by username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Unauthorized.
 */
userRoutes.post('/login', login);

/**
 * @swagger
 * /listUsers:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lists all users
 *     description: Retrieves a list of users. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden. Requires admin role.
 */
userRoutes.get('/listUsers', authenticateUser, isAdmin, list);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The user ID.
 *         username:
 *           type: string
 *           description: The user's username.
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *         cart:
 *           type: array
 *           description: The user's shopping cart containing items.
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *       example:
 *         id: 1
 *         username: 'johndoe'
 *         email: 'johndoe@example.com'
 *         cart: []
 *
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the product.
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart.
 *       example:
 *         productId: 1
 *         quantity: 2
 */

module.exports = userRoutes;

