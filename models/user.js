const mongoose = require('mongoose');
const {model} = require("mongoose");

mongoose.Promise = global.Promise;
const userSchema = mongoose.Schema({
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
const User = mongoose.model('User', userSchema);
const createUser = function (email, password, fname, lname, address, city, postal, telephone, callback) {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: email,
        password: password,
        fname: fname,
        lname: lname,
        isAdmin: false,
        address: address,
        city: city,
        postal: postal,
        telephone: telephone,
        cart: []
    });
    User.findOne({email: email}, function (err, obj) {
        if (!err && !obj) {
            user
                .save()
                .then((newUser) => {
                    console.log(newUser)
                    return callback.json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser,
                    });
                })
                .catch((error) => {
                    return callback.json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        } else {
            return callback.json({
                success: false,
                message: 'user already exist with this mail. \n' + err + ' ' + obj,
            });
        }
    });
}
const loginUser = function (email, password, callback) {
    User.findOne({email: email}, function (err, obj) {
        console.log("obj ", obj)
        console.log("email ", email)
        console.log("pass ", password)
        if (err || !obj) {
            console.log("err ", err)
            return callback.json({
                success: false,
                message: 'no user found.',
            });
        } else {
            if (obj.password === password) {
                return callback.json({
                    success: true,
                    message: 'user found',
                    user: obj
                });
            } else {
                return callback.json({
                    success: false,
                    message: 'Password is incorrect'
                });
            }
        }
    });

}
const getAllUsers = async function () {
    const filter = {};
    const all = await User.find(filter);
    return {
        success: true,
        message: 'all users are found.',
        data: all
    };
}

const deleteUser = async function (userId) {
    await User.deleteOne({_id: userId})
}

module.exports = {
    User,
    loginUser,
    getAllUsers,
    deleteUser,
    createUser
}