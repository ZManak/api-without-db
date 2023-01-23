const express = require("express");
const app = express();
const usersRoutes = require("./routes/userRoutes")

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('Welcome to the Random API')
})

app.use('/api', usersRoutes)

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});

module.exports = app;