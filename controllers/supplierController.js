const mongoose = require("mongoose");
const { Supplier, deleteSupplierModel, getAllSuppliersModel }= require("../models/supplier");


const createSupplier = function (req, res) {
    console.log(req.body)
    const supplier = new Supplier({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        cname: req.body.cname,
        isAdmin: req.body.isAdmin ?? false,
        telephone: req.body.ctelephone,
        publishedItems: []
    });

    Supplier.findOne({email: req.body.email}, async function (err, obj) {
        if (!err && !obj) {
            return supplier
                .save()
                .then((newSupplier) => {
                    return res.status(201).json({
                        success: true,
                        message: 'New supplier created successfully',
                        supplier: newSupplier,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        } else {
            return res.status(301).json({
                success: false,
                message: 'Supplier already exist with this mail. \n' + err + ' ' + obj,
            });
        }
    });
}

/**
 *
 * @param req = {
 *     email: string,
 *     password: string
 * }
 * @param res
 */
const loginSupplier = function (req, res) {
    Supplier.findOne({email: req.body.email}, function (err, obj) {
        if (err || !obj) {
            return res.status(301).json({
                success: false,
                message: 'No supplier found.',
            });
        } else {
            if (obj.password === req.body.password) {
                return res.status(200).json({
                    success: true,
                    message: 'Supplier found',
                    supplierDetails: obj
                });
            } else {
                return res.status(301).json({
                    success: false,
                    message: 'Password is incorrect'
                });
            }
        }
    });
}
const addToPublishedItems = function (req, res) {
    Supplier.updateOne({email: req.body.email}, {$push: {publishedItems: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Success adding published item',
                details: obj
            });
        })
}
const removeFromPublishedItems = function (req, res) {
    Supplier.updateOne({email: req.body.email}, {$pull: {publishedItems: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Popped',
                supplierDetails: obj
            });
        })
}

// Deleting supplier
const innerDeleteSupplier = async function (supplierId, currentUserId) {
    // validation - current user capable of deleting
    return await deleteSupplierModel(supplierId, currentUserId)
}

// Deleting supplier
const deleteSupplier = async function (req, res) {
    //todo validation - current user capable of deleting
    // ---- Before ----
    console.log(req.params.supplierId)
    await innerDeleteSupplier(req.params.supplierId, "636eec1c8d3a32a33b6a8c44")
    //! Change later --> to "req.body.currentUserId"
    //await deleteSupplierModel(req.params.supplierId, "636eec1c8d3a32a33b6a8c44")
   
    return res.status(200).json({
        success: true,
        message: 'Supplier deleted'
    })


    // ---- After ----
    // console.log(req.params.supplierId)
    // //console.log(req.params.currentUserId)
    // //await innerDeleteSupplier(req.params.supplierId, req.params.currentUserId)
    // //! Change later --> to "req.body.currentUserId"
    // const result = await innerDeleteSupplier(req.params.supplierId, "636eec1c8d3a32a33b6a8c44")
    // console.log("result: " + result.success);
    // if(result.success == false)
    // {
    //     return res.status(400).json({ 
    //         success: false,
    //         message: 'Error - No permissions',
    //     });
    // }
    // else{
    //     return res.status(200).json({
    //         success: true,
    //         message: 'Supplier deleted'
    //     })
    // }  
}

// Getting all supplier
const getAllSuppliers = async function () {
    return await getAllSuppliersModel()
}

module.exports = {
    deleteSupplier,
    getAllSuppliers,
    removeFromPublishedItems,
    addToPublishedItems,
    loginSupplier,
    createSupplier
}



