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

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
const { User } = require("../models/user");

// Deleting a warehouse
const deleteWarehouseModel = async function (warehouseId, currentUserId) { 
    const all = await User.findById(currentUserId);
    console.log( all);
    if(all.isAdmin !== true)
    {
        console.log("You are not admin");
        return {
            success: false,
            message: 'No permissions to delete',
            data: all
        };
    }
    else
    {
        await Warehouse.deleteOne({_id: warehouseId})
        return {
            success: true,
            message: 'The supplier was deleted'
        };
    }   
}

// Getting all warehouses
const getAllWarehousesModel = async function () {
    const filter = {};
    const all = await Warehouse.find(filter);
    return {
        success: true,
        message: 'All Warehouses are found.',
        data: all
    };
}

//const createWarehouseModel = function (name, city, street, country, lat , houseNumber , lng) {
const createWarehouseModel = function (name, city, street, lat , houseNumber , lng, callback) {
    const warehouse = new Warehouse({
        _id: mongoose.Types.ObjectId(),
        name: name,
        city: city,
        street: street,
        // country: country,
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
