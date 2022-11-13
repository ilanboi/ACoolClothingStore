const itemController = require("../controllers/itemController");

const express = require('express');

const router = express.Router();
router.post('/createItem', itemController.createItem);
router.delete('/deleteItem/:itemId', itemController.deleteItem);
router.get('/getAllItems', itemController.getAllItems);
router.get('/getSpecificItem/:itemId', itemController.getSpecificItem);
router.get('/search', itemController.getSearchedItems);
module.exports = router;
