const itemController = require("../controllers/itemController");

const express = require('express');

const router = express.Router();
router.post('/createItem', itemController.createItem);
router.post('/updateItemById/:itemId', itemController.updateItemById);
router.delete('/deleteItem/:itemId', itemController.deleteItem);
router.get('/getAllItems', itemController.getAllItems);
router.get('/getSpecificItem/:itemId', itemController.getSpecificItem);
router.get('/search', itemController.getSearchedItems);
router.get('/getItemsByGender/:gender',itemController.getGenderItems)
module.exports = router;
