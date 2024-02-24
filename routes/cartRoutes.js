const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Middleware to check authentication
// router.use(authMiddleware);

cartRouter.post('/:productId',authenticateUser ,cartController.addToCart);
cartRouter.get('/viewCart',authenticateUser, cartController.viewCart);
cartRouter.delete('/deleteCart/:productId',authenticateUser, cartController.removeFromCart);

module.exports = cartRouter;
