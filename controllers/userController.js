const {
    User,
    getAllUsers,
    deleteUser,
    createUser,
    loginUser
} = require("../models/user");

const innerCreateUser = (email, password, fname, lname, address, city, postal, telephone, callback) => {
    return createUser(email, password, fname, lname, address, city, postal, telephone, callback);
}
module.exports.createUser = async function (req, res) {
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
    return await deleteUser(userId)
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

const innerLoginUser = function (email, password, callback) {
    return loginUser(email, password, callback)
}

module.exports.loginUser = function (req, res) {
    return innerLoginUser(req.body.email, req.body.password, res.status(200))
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
    return await getAllUsers()
}
