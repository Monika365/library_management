const BookDAO = require('../dao/book-dao');
const utils = require('../utils/utility');
const BookService = {

    storeBook: (payload) => {
        return new Promise(async(resolve, reject) => {
            let getID = utils.getID(payload.idCode, 4);
            payload['getID']= getID;
            let result =  await BookDAO.getByCondition(payload.stocks);
            if(!result)
            reject({response:'Books cannot be created with zero stocks'});
            
            else{
                UserDAO.storeUser(payload).then(result=>{
                    resolve({response:'stocks of books are created'});
                }).catch(error=>{
                    reject(error);
                
        
                })
            }
        
       
    })

}
}



module.exports = BookService;
