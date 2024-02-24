const express = require('express');
const productRouter = express.Router();
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');
const { createProduct, updateProduct, deleteProduct, getProducts,findProductsByCategory } = require('../controllers/productController');

// Route to view all products - Available to all users
productRouter.get('/',authenticateUser, getProducts);
productRouter.get('/category/:categoryName',findProductsByCategory);

// Routes for product creation, update, and deletion - Restricted to admin users
productRouter.post('/addProduct', isAdmin, createProduct);
productRouter.put('/updateProduct/:productId', isAdmin, updateProduct);
productRouter.delete('/deleteProduct/:productId', isAdmin, deleteProduct);

module.exports = productRouter;
