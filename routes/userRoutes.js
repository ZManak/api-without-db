const express = require('express');
const fs = require('fs')
const userControllers = require('../controllers/userControllers')
const usersApiRouter = express.Router();

usersApiRouter.get('/users/:username?', userControllers.getUsers);
usersApiRouter.get('/country/:country?', userControllers.getByCountry);
usersApiRouter.get('/users/total', userControllers.getTotal);
usersApiRouter.get('/users/vehicles', userControllers.byCarNum);
usersApiRouter.get('/vehicles', userControllers.byCarType)
usersApiRouter.get('/users/food/:food?', userControllers.byFood)
usersApiRouter.get('/foods', userControllers.getFoods);
usersApiRouter.post('/users', userControllers.postUser)
usersApiRouter.put('/users/:username?', userControllers.updateUser)
usersApiRouter.put('/users/:username?/vehicles', userControllers.updateCars)
usersApiRouter.put('/users/:username?/foods', userControllers.updateFood)
usersApiRouter.put('/users/:username?/hide', userControllers.hideUser)
usersApiRouter.delete('/user/:username?', userControllers.delUser)

module.exports = usersApiRouter