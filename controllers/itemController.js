const mongoose = require("mongoose");
const Item = require("../models/item");

module.exports.createItem = function (req, res) {
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

module.exports.getAllItems = async function (req, res) {
    const filter = {};
    const all = await Item.find(filter);
    return res.status(201).json({
        success: true,
        message: 'all items are found.',
        data: all
    });
}

module.exports.getSpecificItem = function (req, res) {
    Item.findById({id: req.body.itemId}, function (err, obj) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'no item with that id.',
            });
        }
        return res.status(201).json({
            success: true,
            message: 'item found.',
            data: obj
        });
    });
}

module.exports.getSearchedItems = function (req, res) {
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
                message: 'no item with that id.',
            });
        }
        return res.status(201).json({
            success: true,
            message: 'item found.',
            data: obj
        });
    });
}
