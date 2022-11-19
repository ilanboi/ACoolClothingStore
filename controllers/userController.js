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

const innerDeleteUser = async function (userId, currentUserId) {
    return await deleteUserModel(userId, currentUserId)
}

const deleteUser = async function (req, res) {
    console.log(req.params.userId)
    //await innerDeleteUser(req.params.userId, req.body.currentUserId)
    //! Change later --> to "req.body.currentUserId"
    const result = await innerDeleteUser(req.params.userId, "6377a7f6356ff1ad98754a73")
    console.log("result: " + result.success);
    
    if(result.success == false)
    {
        return res.status(400).json({ // code 101?
            success: false,
            message: 'Error - No permissions',
        });
    }
    else{
        return res.status(200).json({
            success: true,
            message: 'User deleted'
        })
    }  
}

const innerLoginUser = function (email, password, callback) {
    return loginUserModel(email, password, callback)
}

const loginUser = function (req, res) {
    return innerLoginUser(req.body.email, req.body.password, res.status(200))
}

const addItemToCart = function (req, res) {
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

const updateUserByEmail = function (req, res) {
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

const updateUserById = function (req, res) {  
    console.log(req.body)
    console.log(JSON.parse(req.body.updatedData))
    User.findOneAndUpdate({_id: req.params.userId}, JSON.parse(req.body.updatedData), {new: true},
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
    return await getAllUsersModel()
}

const clearCart = function (req, res) {
    User.findOneAndUpdate({email: req.body.email}, { $set: { cart: [] }}, {new: true},
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
const getCartItems = async function (req, res) {
    //module.exports
    const userData = await User.findById(req.params.userId);
    let itemsData = [];
    for (let item of userData.cart) {
        itemsData.push(await Item.findById(item.item_id));
    }
    res.status(200).json({
        "cart": itemsData

    });
}

module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    updateUserByEmail,
    removeItemFromCart,
    addItemToCart,
    loginUser,
    getCartItems,
    clearCart,
    updateUserById
}