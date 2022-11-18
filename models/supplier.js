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

// Deleting a specific supplier
const deleteSupplierModel = async function (supplierId, currentUserId) {
    await Supplier.deleteOne({_id: supplierId})

   // ---- After ---
   // Adding the USER MODEL here or sending ALL params of the current user from te controller
  
//    const all = await User.findById(currentUserId);
//    console.log(all);
//    if(all.isAdmin !== true)
//    {
//        console.log("You are not admin");
//        return {
//            success: false,
//            message: 'No permissions to delete',
//            data: all
//        };
//    }
//    else
//    {
//       // await Supplier.deleteOne({_id: supplierId})
//        return {
//            success: true,
//            message: 'The supplier was deleted'
//        };
//    }   
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

module.exports = {
    Supplier,
    deleteSupplierModel,
    getAllSuppliersModel
}
