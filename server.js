const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

//Routes
const userRoutes = require("./routes/userRoutes");

// the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

// middlewares
const errorMiddleware = require('./middleware/errorMiddleware');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//define routes
app.use(limiter);
app.use(express.json());
app.use('/user', userRoutes);

//last middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});