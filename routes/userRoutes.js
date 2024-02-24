const express = require('express');
const { signUp, login } = require('../controllers/userController'); // Assuming these functions are implemented in userController.js
userRoutes = express.Router(); 

userRoutes.post('/signup', signUp);
userRoutes.post('/login', login);

module.exports = userRoutes;
