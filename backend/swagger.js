const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'IntelliShare Backend API',
      version: '1.0.0',
      description: 'Backend API documentation for IntelliShare platform',
      contact: {
        name: 'Support Team',
        email: 'vg566556@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}` , // Replace with your URL
      },
    ],
  },
  apis: ['./app/*.js'], // Path to your API files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;

