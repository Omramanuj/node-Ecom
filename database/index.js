const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Construct the database connection string from environment variables
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Initialize Sequelize with the connection string
const sequelize = new Sequelize(connectionString, {
    dialect: "postgres"
});

// Checking if connection is done
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Connecting to model
db.users = require('../models/userModel')(sequelize, DataTypes);

db.products = require('../models/productModel')(sequelize, Sequelize.DataTypes);
db.Category = require('../models/categoryModel')(sequelize, Sequelize.DataTypes);
db.cart=require('../models/cartModel')(sequelize,Sequelize.DataTypes);
db.orders=require('../models/orderModel')(sequelize,Sequelize.DataTypes);
db.orderItems=require('../models/orderItemModel')(sequelize,Sequelize.DataTypes);
// After defining and requiring models


// Now synchronize
sequelize.sync().then(() => {
    console.log("Database synchronized without dropping tables.");
  }).catch((error) => {
    console.error("Failed to synchronize database:", error);
  });
  

db.users.hasOne(db.cart);
db.cart.belongsTo(db.users);

db.Category.hasMany(db.products, { foreignKey: 'categoryId', as: 'products' });
db.products.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

db.cart.belongsToMany(db.products, { through: 'CartProduct', as: 'products' });
db.products.belongsToMany(db.cart, { through: 'CartProduct', as: 'products' });

db.orders.belongsTo(db.users); 
db.users.hasMany(db.orders);

db.orders.hasMany(db.orderItems);
db.orderItems.belongsTo(db.orders);

db.products.hasMany(db.orderItems);
db.orderItems.belongsTo(db.products);

module.exports = db;
