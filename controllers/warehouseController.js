const {Warehouse, deleteWarehouseModel, getAllWarehousesModel, createWarehouseModel} = require("../models/warehouse");

const innerCreateWarehouse = (name, city, street, houseNumber, country, lat ,lng ) => {
    return createWarehouseModel(name, city, street, houseNumber, country, lat ,lng);
}

const createWarehouse = async function (req, res) {
    return innerCreateWarehouse(
        req.body.name,
        req.body.city,
        req.body.street,
        req.body.houseNumber,
        req.body.country,
        req.body.lat,
        req.body.lng,
        res.status(200)
    );
}



// Deleting Warehouse
const innerDeleteWarehouse = async function (warehouseId) {
    return await deleteWarehouseModel(warehouseId)
}

const deleteWarehouse = async function (req, res) {
    //todo validation - current user capable of deleting
    console.log(req.params.warehouseId)
    await innerDeleteWarehouse(req.params.warehouseId)
    return res.status(200).json({
        success: true,
        message: 'Warehouse deleted'
    })
}

// Getting all Warehouses
const getAllWarehouses = async function (req,res) {
    return res.status(200).json({
        success: true,
        message: 'got all Warehouses ',
        warehouses: await getAllWarehousesModel()
    })
}

module.exports = {
    deleteWarehouse,
    getAllWarehouses,
    createWarehouse
}



