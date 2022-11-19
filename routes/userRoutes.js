const userController = require('../controllers/userController')
const express = require('express');

const router = express.Router();
router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
router.post('/updateUserByEmail', userController.updateUserByEmail);
router.post('/updateUserById/:userId', userController.updateUserById);
router.post('/clearCart', userController.clearCart);
router.post('/login', userController.loginUser);
router.put('/addToCart', userController.addItemToCart);
router.get('/getCartItemsOfUser/:userId', userController.getCartItems);
router.post('/removeFromCart', userController.removeItemFromCart);
module.exports = router;
