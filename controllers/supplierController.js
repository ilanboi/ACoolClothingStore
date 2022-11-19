const { Supplier, deleteSupplierModel, getAllSuppliersModel, createSupplierModel } = require("../models/supplier");

const innerCreateSupplier = (email, password, cname, telephone, callback) => {
    return createSupplierModel(email, password, cname, telephone, callback);
}

const createSupplier = async function (req, res) {
    return innerCreateSupplier(
        req.body.email,
        req.body.password,
        req.body.cname,
        req.body.telephone,
        res.status(200)
    );
}

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

const updateSupplierById = function (req, res) {  
    console.log(req.body)
    console.log(JSON.parse(req.body.updatedData))
    console.log("id: "+req.params.supplierId)
    Supplier.findOneAndUpdate({_id: req.params.supplierId}, JSON.parse(req.body.updatedData), {new: true},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Supplier updated',
                userDetails: obj
            });
        })
}

// Deleting supplier
const innerDeleteSupplier = async function (supplierId, currentUserId) {
    return await deleteSupplierModel(supplierId, currentUserId)
}

const deleteSupplier = async function (req, res) {
    console.log(req.params.currentUserId)

    //! Change later --> to "req.body.currentUserId"
    const result = await innerDeleteSupplier(req.params.supplierId, "6377a7f6356ff1ad98754a73")
    console.log("result: " + result.success);
    if(result.success == false)
    {
        return res.status(400).json({ 
            success: false,
            message: 'Error - No permissions',
        });
    }
    else{
        return res.status(200).json({
            success: true,
            message: 'Supplier deleted'
        })
    }  
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
    createSupplier,
    updateSupplierById
}