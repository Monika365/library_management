const userModel = require('../model/user-model');


const UserDAO = {
    storeUser:(payload)=>{
return new userModel({
    name:payload.name,
    id:payload.id,
    contact:payload.contact,
    rollNo:payload.rollNo
}).save();
    },
    updateUser:(condition,payload)=>{
        console.log(condition,payload+'inside Dao');
        
        return  userModel.updateOne(condition, {$set:payload});
            }
}

module.exports = UserDAO;