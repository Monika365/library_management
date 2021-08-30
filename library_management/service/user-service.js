const UserDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken');
const constant = require('../utils/constant');
const utils= require('../utils/utility');
const UserService = {

    storeUser: (payload) => {
        return new Promise(async (resolve, reject) => {
            let result =  await UserDAO.isExist(payload.email);
                if(result)
                reject({response:'Email Already Exist'});
                else{
                    payload['userId'] = (payload.role==constant.ROLE.STUDENT)?utils.getId('ST',4):utils.getId('AD',4);

                    UserDAO.storeUser(payload).then(async result=>{
                        if(payload.role ==constant.ROLE.STUDENT){
                            let details= await UserDAO.isExist(payload.email);
                            resolve({response:{
                                detail:{name:details.name,userId:details.userId},
                                message:'Student registered Successfully'
                            }})
                        }else{  
                            resolve({response:'User Register Successfully'})

                        }
                        
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
        
    },
    getUserDetail:(email)=>{
        return new Promise (async (resolve, reject)=>{
            UserDAO.isExist(email).then(result=>{
                resolve(result);
            }).catch(error=>{
                reject(error);
            })
        })

    }
    
}

module.exports = UserService