const express = require('express');
const { signUp, login ,list} = require('../controllers/userController'); // Assuming these functions are implemented in userController.js
const { authenticateUser ,isAdmin} = require('../middleware/authMiddleware');
userRoutes = express.Router(); 

userRoutes.post('/signup', signUp);
userRoutes.post('/login', login);
userRoutes.get('/listUsers', isAdmin, list);

module.exports = userRoutes;
