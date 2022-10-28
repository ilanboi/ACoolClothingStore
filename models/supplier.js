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
module.exports = mongoose.model('Supplier', supplierSchema);
