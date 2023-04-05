const express = require("express");
const app = express();
const usersRoutes = require("./routes/userRoutes");
const fs = require("fs");

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});

app.use("/users", userRouter);

app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.get("/users", (req, res) => {
