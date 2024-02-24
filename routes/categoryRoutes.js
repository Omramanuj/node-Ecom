const express = require('express');
const cataegoryRouter = express.Router();

const { createCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');

cataegoryRouter.post('/addCategory', createCategory);
cataegoryRouter.get('/list', getCategories);
cataegoryRouter.put('/updateCategory/:categoryId', updateCategory);
cataegoryRouter.delete('/deleteCategory/:categoryId', deleteCategory);

module.exports = cataegoryRouter;