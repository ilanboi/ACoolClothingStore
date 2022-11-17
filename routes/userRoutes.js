const userController = require('../controllers/userController')
const express = require('express');

const router = express.Router();
router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
router.post('/updateUser', userController.updateUser);
router.post('/login', userController.loginUser);
router.post('/addToCart', userController.addItemToCart);
router.get('/getCartItemsOfUser/:userId', userController.getCartItems);
router.post('/removeFromCart', userController.removeItemFromCart);
module.exports = router;
