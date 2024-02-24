// swaggerDef.js
const swaggerDefinition = {
    openapi: '3.0.0', 
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'This is a sample server for an e-commerce platform.',
    },
    servers: [
      {
        url: 'http://localhost:3000/', 
        description: 'Node-Ecommerce API server',
      },
    ],
    // You can define components, securitySchemes, etc., here
  };
  
  module.exports = swaggerDefinition;
  