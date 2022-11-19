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

const createUserModel = function (email, password, fname, lname, address, city, postal, telephone, callback) {
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
                message: 'User already exist with this mail. \n' + err + ' ' + obj,
            });
        }
    });
}
const loginUserModel = function (email, password, callback) {
    User.findOne({email: email}, function (err, obj) {
        if (err || !obj) {
            console.log("err ", err)
            return callback.json({
                success: false,
                message: 'No user found.',
            });
        } else {
            if (obj.password === password) {
                return callback.json({
                    success: true,
                    message: 'User found',
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
const getAllUsersModel = async function () {
    const filter = {};
    const all = await User.find(filter);
    return {
        success: true,
        message: 'All users are found.',
        data: all
    };
}

const deleteUserModel = async function (userId, currentUserId) {
    // ---- WORKING -----
    const all = await User.findById(currentUserId);
    console.log(all);
    if(all.isAdmin !== true)
    {
        console.log("You are not admin");
        return {
            success: false,
            message: 'No permissions to delete',
            data: all
        };
    }
    else
    {
        await User.deleteOne({_id: userId})
        return {
            success: true,
            message: 'The user was deleted'
        };
    }   
}

module.exports = {
    User,
    loginUserModel,
    getAllUsersModel,
    deleteUserModel,
    createUserModel
}