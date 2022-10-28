const itemController = require("../controllers/itemController");

const express = require('express');

const router = express.Router();
router.post('/createItem', itemController.createItem);
router.get('/getAllItems', itemController.getAllItems);
router.get('/getSpecificItem/:itemId', itemController.getSpecificItem);
module.exports = router;
