const {
    User,
    getAllUsersModel,
    deleteUserModel,
    createUserModel,
    loginUserModel
} = require("../models/user");
const {Item} = require("../models/item");

const innerCreateUser = (email, password, fname, lname, address, city, postal, telephone, callback) => {
    return createUserModel(email, password, fname, lname, address, city, postal, telephone, callback);
}
const createUser = async function (req, res) {
    //module.exports.createUser = async function (req, res) {
    return innerCreateUser(
        req.body.email,
        req.body.password,
        req.body.fname,
        req.body.lname,
        req.body.address,
        req.body.city,
        req.body.postal,
        req.body.telephone,
        res.status(200)
    );
}

const innerDeleteUser = async function (userId) {
    //todo validation - current user capable of deleting
    return await deleteUserModel(userId)
}

const deleteUser = async function (req, res) {
    //module.exports
    //todo validation - current user capable of deleting
    console.log(req.params.userId)
    await innerDeleteUser(req.params.userId)
    return res.status(200).json({
        success: true,
        message: 'User deleted'
    })
}

const innerLoginUser = function (email, password, callback) {
    return loginUserModel(email, password, callback)
}

const loginUser = function (req, res) {
    //module.exports
    return innerLoginUser(req.body.email, req.body.password, res.status(200))
}

const addItemToCart = function (req, res) {
    //module.exports
    // let doc = await User.findOneAndUpdate({email: req.body.email}, {$push: {cart: req.body.item_id}});
    User.updateOne({email: req.body.email}, {$push: {cart: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'User found',
                details: obj
            });
        })

}
const removeItemFromCart = function (req, res) {
    //module.exports
    // let doc = await User.findOneAndUpdate({email: req.body.email}, {$pull: {cart: req.body.item_id}});
    User.updateOne({email: req.body.email}, {$pull: {cart: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'User found',
                userDetails: obj
            });
        })

}
const updateUser = function (req, res) {
    //module.exports
    console.log(req.body)
    console.log(JSON.parse(req.body.updatedData))
    console.log(req.body.email)
    // let doc = await User.findOneAndUpdate({email: req.body.email}, {$pull: {cart: req.body.item_id}});
    User.findOneAndUpdate({email: req.body.email}, JSON.parse(req.body.updatedData), {new: true},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'Error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'User updated',
                userDetails: obj
            });
        })

}
const getAllUsers = async function () {
    //module.exports
    return await getAllUsersModel()
}


const getCartItems = async function (req, res) {
    //module.exports
    const userData =  await User.findById(req.params.userId);
    let itemsData = [];
    for(let item of userData.cart){
       itemsData.push(await Item.findById(item.item_id));
    }
    res.status(200).json({
        "Cart": itemsData
    });

}

module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    updateUser,
    removeItemFromCart,
    addItemToCart,
    loginUser,
    getCartItems
}