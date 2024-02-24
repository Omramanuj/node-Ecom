const errorMiddleware = (err, req, res, next) => {
   
    console.error(err.stack);

    // Set the status code deafult to 500
    const statusCode = err.statusCode ? err.statusCode : 500;

    // Send the error response
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: err.message ? err.message : 'An unexpected error occurred',
    });
};

module.exports = errorMiddleware;