const userModel = require('../model/user-model');


const UserDAO = {
    storeUser: (payload) => {
        return new userModel({
            name: payload.name,
            userId: payload.userId,
            phone: payload.phone,
            role: payload.role,
            password: payload.password
        }).save();
    },
    updateUser: (condition, payload) => {
        console.log(condition, payload + 'inside Dao');

        return userModel.updateOne(condition, { $set: payload });
    },
    isExist: (userId) => {
        return userModel.findOne({ userId: userId })

    },
}

module.exports = UserDAO;