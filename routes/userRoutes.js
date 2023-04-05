const express = require('express');
const userRoutes = express.Router();
const userControllers = require("../controllers/userControllers")

userRoutes.get('/', userControllers.getUser);

userRoutes.post('/', userControllers.postUser);

module.exports = userRoutes;