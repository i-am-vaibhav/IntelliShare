const { app } = require("./app/app");
// Swagger Library Import
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger')

const PORT = process.env.PORT || 3000;

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Configuring the app to listen on PORT
app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at: http://localhost:${PORT}/api-docs`);
});