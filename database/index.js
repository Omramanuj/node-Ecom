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

// Exporting the module
module.exports = db;
