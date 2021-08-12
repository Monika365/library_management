const UserDAO = require('../dao/user-dao');
const UserService = {

    storeUser:(payload)=>{
        return new Promise ((resolve,reject)=>{
UserDAO.storeUser(payload).then((result)=>{
resolve(result);
}).catch(error =>{
    reject(error);
})
        })
        
    },
    updateUser:(condition,payload)=>{
       
        return new Promise ((resolve,reject)=>{
UserDAO.updateUser(condition,payload).then((result)=>{
resolve(result);
}).catch(error =>{
    reject(error);
})
        })
        
    }
}

module.exports = UserService