const express = require("express");
const app = express();
const usersRoutes = require("./routes/userRoutes")
const fs = require('fs')

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('Welcome to the Random API')
})

app.use('/api', usersRoutes)

module.exports = app;