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
//module.exports = mongoose.model('Supplier', supplierSchema);
const Supplier = mongoose.model('Supplier', supplierSchema);

// Deleting an item
const deleteSupplierModel = async function (supplierId) {
    await Supplier.deleteOne({_id: supplierId})
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

module.exports = {
    Supplier,
    deleteSupplierModel,
    getAllSuppliersModel,
    createSupplierModel
}
