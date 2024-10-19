const { app } = require("./app/app");

const PORT = process.env.PORT || 3000;
// Configuring the app to listen on PORT
app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});