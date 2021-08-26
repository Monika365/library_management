const UserDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken');
const constant = require('../utils/constant');
const UserService = {

    storeUser: (payload) => {
        return new Promise(async (resolve, reject) => {
            let result =  await UserDAO.isExist(payload.email);
                if(result)
                reject({response:'Email Already Exist'});
                else{
                    UserDAO.storeUser(payload).then(result=>{
                        resolve({response:'User Register Successfully'})
                    }).catch(error=>{
                        reject(error);
                    })
                }
            
           
        })

    },
    login: (payload)=>{
        return new Promise (async (resolve, reject)=>{
            console.log('req payload login  service', payload);
            
            let result = await UserDAO.isExist(payload.email);
            console.log('isExist Response--', result);
            if(!result)
            reject({response:'Email doesnot exist. Please register..'});
            else{
                if(payload.password == result.password){
                    let jwtPayload = {name:result.name, email:result.email, role:result.role, phone:result.phone};

                    let token = jwt.sign(jwtPayload, constant.SECRET_KEY);
                    jwtPayload['token']= token;
                    console.log('result--', jwtPayload);
                    resolve({response:jwtPayload});

                }else{
                    reject({response:'Invalid password. Please enter correct password to proceed..'})
                }
            }
            
        })
        
    }
    
}

module.exports = UserService