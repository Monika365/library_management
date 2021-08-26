const userModel = require('../model/user-model');


const UserDAO = {
    storeUser:async (payload) => {


        return new userModel({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            role: payload.role,
            password: payload.password
        }).save();
    },
    updateUser: (condition, payload) => {
        console.log(condition, payload + 'inside Dao');

        return userModel.updateOne(condition, { $set: payload });
    },
    isExist: (email) => { // register
        return userModel.findOne({ email: email })

    },
}

module.exports = UserDAO;