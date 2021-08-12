const UserDAO = require('../dao/user-dao');
const utils = require('../utils/utility');
const UserService = {

    login: (payload) => {
        return new Promise((resolve, reject) => {
           console.log('payload -', payload);
           // statement 
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