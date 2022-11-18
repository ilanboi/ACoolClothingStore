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

const Item = mongoose.model('Item', itemSchema);

const getAllItemsModel = async function () {
    const filter = {};
    const all = await Item.find(filter);
    return {
        success: true,
        message: 'All items are found.',
        data: all
    };
}

const getItemById = async function (itemId) {
    try {
        const all = await Item.findById(itemId);
        return {
            success: true,
            message: 'Item found.',
            data: all
        };
    } catch (e) {
        return {
            success: false,
            message: 'Item not found'
        };
    }
}


const getGenderItemsModel = async function (gender) {
    const filter = {"kind": gender};
    const all = await Item.find(filter);
    console.log(all);
    return {
        success: true,
        message: 'All items are found.',
        data: all
    };

}

// Deleting an item
const deleteItemModel = async function (itemId) {
    await Item.deleteOne({_id: itemId})
}

module.exports = {
    Item,
    getAllItemsModel,
    getItemById,
    deleteItemModel,
    getGenderItemsModel
};

