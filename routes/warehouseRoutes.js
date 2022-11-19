const warehouseController = require('../controllers/warehouseController')
const express = require('express');

const router = express.Router();
router.post('/createWarehouse', warehouseController.createWarehouse);
router.delete('/deleteWarehouse/:warehouseId', warehouseController.deleteWarehouse);
router.get('/getAllWarehouses', warehouseController.getAllWarehouses);
router.post('/updateWarehouseById/:warehouseId', warehouseController.updateWarehouseById);
module.exports = router;
