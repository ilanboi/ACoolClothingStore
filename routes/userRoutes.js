const userController = require('../controllers/userController')
const express = require('express');

const router = express.Router();
router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
router.post('/updateUser', userController.updateUser);
router.post('/clearCart', userController.clearCart);
router.post('/login', userController.loginUser);
router.put('/addToCart', userController.addItemToCart);
router.get('/getCartItemsOfUser/:userId', userController.getCartItems);
router.post('/removeFromCart', userController.removeItemFromCart);
module.exports = router;
