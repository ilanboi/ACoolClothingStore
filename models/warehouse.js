const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const warehouseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: String,
        required: true,
    },
     lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    }
    
});
//module.exports = mongoose.model('Warehouse', warehouseSchema);
const Warehouse = mongoose.model('Warehouse', warehouseSchema);

// Deleting a warehouse
const deleteWarehouseModel = async function (warehouseId) {
    await Warehouse.deleteOne({_id: warehouseId})
}

// Getting all warehouses
const getAllWarehousesModel = async function () {
    const filter = {};
    const all = await Warehouse.find(filter);
    console.log(all)
    return {
        success: true,
        message: 'All Warehouses are found.',
        data: all
    };
}

const createWarehouseModel = function (name, city, street, country, lat , houseNumber , lng) {
    const warehouse = new Warehouse({
        _id: mongoose.Types.ObjectId(),
        name: name,
        city: city,
        street: street,
        country: country,
        houseNumber: houseNumber,
        lat: lat,
        lng: lng
    });
    Warehouse.findOne({name: name}, function (err, obj) {
        if (!err && !obj) {
            warehouse
                .save()
                .then((newWarehouse) => {
                    console.log(newWarehouse)
                    return callback.json({
                        success: true,
                        message: 'New Warehouse created successfully',
                        Warehouse: newWarehouse,
                    });
                })
                .catch((error) => {
                    return callback.json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        } else {
            return callback.json({
                success: false,
                message: 'Warehouse already exist with this name. \n' + err + ' ' + obj,
            });
        }
    });
}

module.exports = {
    Warehouse,
    deleteWarehouseModel,
    getAllWarehousesModel,
    createWarehouseModel
}
