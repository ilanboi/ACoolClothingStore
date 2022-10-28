const userController = require('../controllers/userController')
const express = require('express');

const router = express.Router();
router.post('/createUser', userController.createUser);
router.post('/updateUser', userController.updateUser);
router.post('/login', userController.loginUser);
router.post('/addToCart', userController.addItemToCart);
router.post('/removeFromCart', userController.removeItemFromCart);
module.exports = router;
