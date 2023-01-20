const express = require("express");
const app = express();
const usersRoutes = require("./routes/userRoutes")
const fs = require('fs')

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});

app.use('/', usersRoutes)