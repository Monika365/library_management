const userModel = require('../model/user-model');
const bcrypt = require('bcrypt');
const saltRounds = 10; //salt value can be 8 or more than that,if it increases more than 10 
// it take more time to exicute..default salt value is 10.10 rounds it do for encode 


const UserDAO = {
    storeUser:async (payload) => {

        let password = await bcrypt.hash(payload.password, saltRounds);
        payload.password = password;

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