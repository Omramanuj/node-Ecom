const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swagger.js');
const errorMiddleware = require('./middleware/errorMiddleware');
//Routes
const productRouter = require('./routes/productRotues');
const userRoutes = require("./routes/userRoutes");
const categoryRouter = require('./routes/categoryRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
// the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
  });

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const options = {
  swaggerDefinition,

  apis: ['./routes/*.js'], // Adjust this path to where your route definitions are
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//define routes
app.use(limiter);
app.use(express.json());
app.use('/user', userRoutes);
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
//last middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});