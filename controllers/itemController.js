const mongoose = require("mongoose");
const { Item, getAllItemsModel, getItemById, deleteItemModel } = require("../models/item");

const createItem = function (req, res) {
    const item = new Item({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        kind: req.body.kind,
        price: req.body.price,
        date: req.body.date
    });
    return item
        .save()
        .then((newItem) => {
            return res.status(201).json({
                success: true,
                message: 'New item created successfully',
                Item: newItem,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

// why export the inner??
const innerGetAllItems = async function () {
    return await getAllItemsModel()
}
const innerGetSpecificItem = async function (itemId) {
    return await getItemById(itemId)
}

// Deleting item
const innerDeleteItem = async function (itemId) {
    //todo validation - current user capable of deleting
    return await deleteItemModel(itemId)
}
const deleteItem = async function (req, res) {
    //todo validation - current user capable of deleting
    console.log(req.params.itemId)
    await innerDeleteItem(req.params.itemId)
    return res.status(200).json({
        success: true,
        message: 'Item deleted'
    })
}
const getAllItems = async function (req, res) {
    return res.status(200).json(await innerGetAllItems())
}

const getSpecificItem = async function (req, res) {
    return res.status(200).json(await innerGetSpecificItem(req.params.itemId));
}

const getSearchedItems = function (req, res) {
    const searchText = req.query.searchText;
    const stringSearchFields = ['title', 'description'];
    const query = {
        $or: [
            ...stringSearchFields.map(field => ({
                [field]: new RegExp(searchText, 'i')
            })),
            // ...numberSearchFields.map(field => ({
            //     $where: `/^${searchTerm}.*/.test(this.${field})`
            // }))
        ]
    };
    Item.find(query, function (err, obj) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No item with that id.',
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Item found.',
            data: obj
        });
    });
}


module.exports = {
    getAllItems,
    innerGetAllItems, // why export the inner?
    createItem,
    getSpecificItem,
    getSearchedItems,
    deleteItem
}