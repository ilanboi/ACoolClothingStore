const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const itemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: false,
        default: []
    },
    image_url: {
        type: String,
        required: false,
        default: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    },
    rating: {
        type: Number,
        required: false,
        default: 1
    },
    description: {
        type: String,
        required: false,
    },
    kind: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: false,
        default: "S, M, L, XL"
    },
    date: {
        type: String,
        required: false,
    },
});
module.exports = mongoose.model('Item', itemSchema);
