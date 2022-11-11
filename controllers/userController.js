const mongoose = require("mongoose");
const User = require("../models/user");

/**
 *
 * @param req = {
 *     email: string,
 *     password: string,
 *     fname: string,
 *     lname: string,
 *     isAdmin: string
 * }
 * @param res
 */
module.exports.createUser = function (req, res) {
    console.log(req.body)

    const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        isAdmin: req.body.isAdmin ?? false,
        address: req.body.address,
        city: req.body.city,
        postal: req.body.postal,
        telephone: req.body.telephone,
        cart: []
    });
    User.findOne({email: req.body.email}, async function (err, obj) {
        if (!err && !obj) {
            return user
                .save()
                .then((newUser) => {
                    return res.status(201).json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        } else {
            return res.status(301).json({
                success: false,
                message: 'user already exist with this mail. \n' + err + ' ' + obj,
            });
        }

    });
}
const innerDeleteUser = async function (userId) {
    //todo validation - current user capable of deleting
    return await User.deleteUser(userId)
}

module.exports.deleteUser = async function (req, res) {
    //todo validation - current user capable of deleting
    console.log(req.params.userId)
    await innerDeleteUser(req.params.userId)
    return res.status(200).json({
        success: true,
        message: 'user deleted'
    })
}

/**
 *
 * @param req = {
 *     email: string,
 *     password: string
 * }
 * @param res
 */
module.exports.loginUser = function (req, res) {
    User.findOne({email: req.body.email}, function (err, obj) {
        console.log(obj)
        console.log(req.body)
        if (err || !obj) {
            return res.status(301).json({
                success: false,
                message: 'no user found.',
            });
        } else {
            if (obj.password === req.body.password) {
                return res.status(200).json({
                    success: true,
                    message: 'user found',
                    userDetails: obj
                });
            } else {
                return res.status(301).json({
                    success: false,
                    message: 'Password is incorrect'
                });
            }
        }
    });
}
module.exports.addItemToCart = function (req, res) {
    // let doc = await User.findOneAndUpdate({email: req.body.email}, {$push: {cart: req.body.item_id}});
    User.updateOne({email: req.body.email}, {$push: {cart: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'user found',
                details: obj
            });
        })

}
module.exports.removeItemFromCart = function (req, res) {
    // let doc = await User.findOneAndUpdate({email: req.body.email}, {$pull: {cart: req.body.item_id}});
    User.updateOne({email: req.body.email}, {$pull: {cart: {item_id: req.body.item_id}}}, {},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'user found',
                userDetails: obj
            });
        })

}
module.exports.updateUser = function (req, res) {
    console.log(req.body)
    console.log(JSON.parse(req.body.updatedData))
    console.log(req.body.email)
    // let doc = await User.findOneAndUpdate({email: req.body.email}, {$pull: {cart: req.body.item_id}});
    User.findOneAndUpdate({email: req.body.email}, JSON.parse(req.body.updatedData), {new: true},
        function (err, obj) {
            if (err || obj.modifiedCount === 0) {
                return res.status(301).json({
                    success: false,
                    message: 'error.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'user updated',
                userDetails: obj
            });
        })

}
module.exports.getAllUsers = async function () {
    return await User.getAllUsers()
}


