const {Warehouse, deleteWarehouseModel, getAllWarehousesModel, createWarehouseModel} = require("../models/warehouse");

//const innerCreateWarehouse = (name, city, street, houseNumber, country, lat ,lng, callback) => {
const innerCreateWarehouse = (name, city, street, houseNumber, lat ,lng, callback ) => {
    // return createWarehouseModel(name, city, street, houseNumber, country, lat ,lng, callback);
    return createWarehouseModel(name, city, street, houseNumber, lat ,lng, callback);
}

const createWarehouse = async function (req, res) {
    return innerCreateWarehouse(
        req.body.name,
        req.body.city,
        req.body.street,
        req.body.houseNumber,
       // req.body.country,
        req.body.lat,
        req.body.lng,
        res.status(200)
    );
}

// Deleting Warehouse
const innerDeleteWarehouse = async function (warehouseId, currentUserId) {
    return await deleteWarehouseModel(warehouseId, currentUserId);
}

const deleteWarehouse = async function (req, res) {
    console.log("id: "+ req.params.warehouseId);
    
    //! Change later --> to "req.body.currentUserId"
    const result = await innerDeleteWarehouse(req.params.warehouseId, "6377a7f6356ff1ad98754a73")
    console.log("result: " + result.success);
    if(result.success == false)
    {
        return res.status(400).json({ // code 101?
            success: false,
            message: 'Error - No permissions',
        });
    }
    else{
        return res.status(200).json({
            success: true,
            message: 'Warehouse deleted'
        })
    }  
}

const innerGetAllWarehouses = async function () {
    return await getAllWarehousesModel();
}

// Getting all Warehouses
const getAllWarehouses = async function (req,res) {
    
    return res.status(200).json({
        success: true,
        message: 'got all Warehouses ',
        warehouses: await innerGetAllWarehouses()
    })
}
const updateWarehouseById = function (req, res) {  
    console.log(req.body)
    console.log(JSON.parse(req.body.updatedData))
    console.log("id: "+req.params.warehouseId)
    Warehouse.findOneAndUpdate({_id: req.params.warehouseId}, JSON.parse(req.body.updatedData), {new: true},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Warehouse updated',
                userDetails: obj
            });
    })
}

module.exports = {
    deleteWarehouse,
    getAllWarehouses,
    createWarehouse,
    innerGetAllWarehouses,
    updateWarehouseById
}



