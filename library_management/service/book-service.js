const BookDAO = require('../dao/book-dao');
const utils = require('../utils/utility');
const BookService = {

    storeBook: (payload) => {
        return new Promise(async(resolve, reject) => {
            let isExist = await BookDAO.getByTitle(payload.title);
            if(isExist)
            return reject({response:"Book Already Exist"});
            if(!payload.stocks)
            return reject({response:"Book cannot be created with Zero Stock"});
            let id = utils.getID('BK', 4);// BK-2345  
            payload['bookId']= id;
                BookDAO.storeBook(payload).then(result=>{
                    resolve({response:'Book created Successfully.'});
                }).catch(error=>{
                    reject(error);
                
        
                })
            
        
       
    })

}
}



module.exports = BookService;
