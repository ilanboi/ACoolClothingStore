const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postal: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    }

});
module.exports = mongoose.model('User', userSchema);
