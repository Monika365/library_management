const UserDAO = require('../dao/user-dao');
const utils = require('../utils/utility');
const UserService = {

    login: (payload) => {
        return new Promise((resolve, reject) => {
          userDAO.isExist(payload.userId).then(async (result) => {
            console.log(result);
            // resolve({"service got hit":result});
            if (!result) {
                reject("please register");
            }
            else{
                resolve(result);
            }
            console.log("hi im authservice", payload.password, result.password);
           // statement 
        })
    })
    },
    updateUser: (condition, payload) => {

        return new Promise((resolve, reject) => {

            UserDAO.updateUser(condition, payload).then((result) => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })

    }

}

module.exports = UserService