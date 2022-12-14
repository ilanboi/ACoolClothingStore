const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const supplierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cname: {
        type: String,
        required: true,
    },
    publishedItems: {
        type: Array,
        required: true,
        default: []
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    telephone: {
        type: String,
        required: true,
    }
});

const Supplier = mongoose.model('Supplier', supplierSchema);
const { User } = require("../models/user");

// Deleting a specific supplier
const deleteSupplierModel = async function (supplierId, currentUserId) {
   const all = await User.findById(currentUserId);
   console.log(all);
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
       await Supplier.deleteOne({_id: supplierId})
       return {
           success: true,
           message: 'The supplier was deleted'
       };
   }   
}

// Getting all suppliers
const getAllSuppliersModel = async function () {
    const filter = {};
    const all = await Supplier.find(filter);
    return {
        success: true,
        message: 'All supplier are found.',
        data: all
    };
}

const createSupplierModel = function (email, password, cname, telephone, callback) {
    const supplier = new Supplier({
        _id: mongoose.Types.ObjectId(),
        email: email,
        password: password,
        cname: cname,
        telephone: telephone,
        publishedItems: []
    });
    Supplier.findOne({email: email}, function (err, obj) {
        if (!err && !obj) {
            supplier
                .save()
                .then((newUser) => {
                    console.log(newUser)
                    return callback.json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser,
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
                message: 'User already exist with this mail. \n' + err + ' ' + obj,
            });
        }
    });
}
const loginSupplierModel = function (email, password, callback) {
    Supplier.findOne({email: email}, function (err, obj) {
        if (err || !obj) {
            console.log("err ", err)
            return callback.json({
                success: false,
                message: 'No user found.',
            });
        } else {
            if (obj.password === password) {
                return callback.json({
                    success: true,
                    message: 'Supplier found',
                    supplierDetails: obj
                });
            } else {
                return callback.json({
                    success: false,
                    message: 'Password is incorrect'
                });
            }
        }
    });

}

module.exports = {
    Supplier,
    deleteSupplierModel,
    getAllSuppliersModel,
    createSupplierModel,
    loginSupplierModel
}
