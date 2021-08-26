const UserDAO = require('../dao/user-dao');
const utils = require('../utils/utility');
const jwt = require('jsonwebtoken');
const UserService = {

    login: (payload) => { 

        console.log('payload inside service from controller', payload);

        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()
            UserDAO.isExist(payload.email).then(async (result) => {
                
                console.log(result);
                // resolve({"service got hit":result});
                if (!result) {
                    reject("please register");
                }
                console.log("hi i m authservice", payload.password, result.password);

                
                if (match) {
                    let data = JSON.parse(JSON.stringify(result)); //cloning coping objects
                    delete data.password;
                    let token = jwt.sign(data,"HI123");
                    console.log(token);
                    data['token'] = token;

                    resolve(data);
                } else {
                    reject("invalid password");
                }

            }).catch(error => {
                reject(error);
            })

        })


    }
    // updateUser: (condition, payload) => {

    //     return new Promise((resolve, reject) => {

    //         UserDAO.updateUser(condition, payload).then((result) => {
    //             resolve(result);
    //         }).catch(error => {
    //             reject(error);
    //         })
    //     })

    // }

}

module.exports = UserService