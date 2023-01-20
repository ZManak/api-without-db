const express = require('express');
const fs = require('fs')
const userControllers = require('../controllers/userControllers')
const usersApiRouter = express.Router();
// Rutas de API

usersApiRouter.get('/', userControllers.getUsers)
usersApiRouter.get('/user/:username?', userControllers.getUsers);
usersApiRouter.get('/country/:country?', userControllers.getByCountry);
usersApiRouter.get('/users/total', userControllers.getTotal);

module.exports = usersApiRouter