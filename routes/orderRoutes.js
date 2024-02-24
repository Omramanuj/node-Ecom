const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser } = require('../middleware/authMiddleware');

orderRouter.post('/', authenticateUser, orderController.placeOrder);
orderRouter.get('/orderHistory', authenticateUser, orderController.orderHistory);
orderRouter.get('/orderDetails/:orderId', authenticateUser, orderController.orderDetails);


module.exports= orderRouter;