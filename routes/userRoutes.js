const express = require('express');
const fs = require('fs')
const getUsers = require('../controllers/userControllers')
const usersApiRouter = express.Router();
// Rutas de API

usersApiRouter.get('/:username?', getUsers);

module.exports = usersApiRouter