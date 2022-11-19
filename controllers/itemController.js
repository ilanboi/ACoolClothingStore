const mongoose = require("mongoose");
const {
    Item,
    getAllItemsModel,
    getItemById,
    getGenderItemsModel,
    deleteItemModel,
    filterItemsModel
} = require("../models/item");

const createItem = function (req, res) {
    const item = new Item({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        kind: req.body.kind,
        price: req.body.price,
        size: req.body.size,
        image_url: req.body.image_url,
        date: req.body.date,
        company: req.body.company
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

const innerGetAllItems = async function () {
    return await getAllItemsModel()
}

const innerGetSpecificItem = async function (itemId) {
    return await getItemById(itemId)
}

// Deleting item
const innerDeleteItem = async function (itemId, currentUserId) {
    return await deleteItemModel(itemId, currentUserId)
}
const deleteItem = async function (req, res) {
    console.log(req.params.currentUserId)

    //! Change later --> to "req.body.currentUserId"
    const result = await innerDeleteItem(req.params.itemId, "6377a7f6356ff1ad98754a73")
    console.log("result: " + result.success);
    if (result.success == false) {
        return res.status(400).json({
            success: false,
            message: 'Error - No permissions',
        });
    } else {
        return res.status(200).json({
            success: true,
            message: 'Supplier deleted'
        })
    }
}

const getAllItems = async function (req, res) {
    return res.status(200).json(await innerGetAllItems())
}

const getSpecificItem = async function (req, res) {
    return res.status(200).json(await innerGetSpecificItem(req.params.itemId));
}

const getGenderItems = async function (req, res) {
    return res.status(200).json(await getGenderItemsModel(req.params.gender))
}

const getFilteredItems = async function (req, res) {
    return res.status(200).json(await filterItemsModel(
        JSON.stringify(req.body.kind),
        // req.body.companies,
        JSON.stringify(req.body.sizes),
        // req.body.prices,
    ))
}

const getFilteredItemsSocket = async function (kind, sizes, prices, companies) {
    return JSON.stringify(await filterItemsModel(
        JSON.stringify(kind),
        JSON.stringify(sizes),
        JSON.stringify(prices),
        JSON.stringify(companies)
    ))
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
const updateItemById = function (req, res) {
    console.log(req.body)
    console.log(JSON.parse(req.body.updatedData))
    console.log("id: " + req.params.itemId)
    Item.findOneAndUpdate({_id: req.params.itemId}, JSON.parse(req.body.updatedData), {new: true},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Supplier updated',
                userDetails: obj
            });
        })
}


module.exports = {
    getAllItems,
    innerGetAllItems,
    createItem,
    getSpecificItem,
    getSearchedItems,
    deleteItem,
    getGenderItems,
    updateItemById,
    getFilteredItems,
    getFilteredItemsSocket
}