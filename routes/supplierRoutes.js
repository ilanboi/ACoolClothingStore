const supplierController = require('../controllers/supplierController')
const express = require('express');

const router = express.Router();
router.post('/createSupplier', supplierController.createSupplier);
router.post('/login', supplierController.loginSupplier);
router.post('/addToPublishedItems', supplierController.addToPublishedItems);
router.post('/removeFromPublishedItems', supplierController.removeFromPublishedItems);
module.exports = router;
