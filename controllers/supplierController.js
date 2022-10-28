const mongoose = require("mongoose");
const Supplier = require("../models/supplier");

module.exports.createSupplier = function (req, res) {
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
                message: 'supplier already exist with this mail. \n' + err + ' ' + obj,
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
module.exports.loginSupplier = function (req, res) {
    Supplier.findOne({email: req.body.email}, function (err, obj) {
        if (err || !obj) {
            return res.status(301).json({
                success: false,
                message: 'no supplier found.',
            });
        } else {
            if (obj.password === req.body.password) {
                return res.status(200).json({
                    success: true,
                    message: 'supplier found',
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
module.exports.addToPublishedItems = function (req, res) {
    Supplier.updateOne({email: req.body.email}, {$push: {publishedItems: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'success adding published item',
                details: obj
            });
        })

}
module.exports.removeFromPublishedItems = function (req, res) {
    Supplier.updateOne({email: req.body.email}, {$pull: {publishedItems: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'popped',
                supplierDetails: obj
            });
        })

}



