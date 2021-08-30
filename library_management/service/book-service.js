const BookDAO = require('../dao/book-dao');
const utils = require('../utils/utility');
const Constant = require('../utils/constant'); 
const BookService = {

    storeBook: (payload,role) => {
        return new Promise(async(resolve, reject) => {
            if(role==Constant.ROLE.STUDENT)
            return reject({response:'You are not authorized to proceed this operation.'});
            let isExist = await BookDAO.getBook({title:payload.title, author:payload.author});
            if(isExist.length>0){
                console.log('isExist book', isExist);
                return reject({message:"Book Already Exist", detail:{title:isExist[0].title,bookId:isExist[0].bookId}});
            }           
            if(!payload.stocks)
            return reject({response:"Book cannot be created with Zero Stock"});
            let id = utils.getId('BK', 8);// BK-2345  
            payload['bookId']= id;
                BookDAO.storeBook(payload).then(async result=>{
                    let bookDetail = await BookDAO.getByTitle(payload.title);
                    resolve({message:'Book created Successfully.', detail:{title:bookDetail.title,bookId:bookDetail.bookId, author:bookDetail.author}});
                }).catch(error=>{
                    reject(error);        
                })
            
        
       
    })

},
getBook:(payload)=>{
    return new Promise((resolve,reject)=>{
        BookDAO.getBook(payload).then(result=>{
            resolve({response:result});
        }).catch(error=>{
            reject(error)
        })
    })
},
updateStock:(bookId, value, role)=>{
    return new Promise((resolve,reject)=>{
        if(role==Constant.ROLE.STUDENT)
            return reject({response:'You are not authorized to proceed this operation.'});
        BookDAO.updateStock(bookId, value).then(result=>{
            if(result.nModified){
                resolve({response:'Updated the stock for bookId '+ bookId});
            }else{
                resolve({response:'Stock not updated'});

            }
            
        }).catch(error=>{
            reject(error)
        })
    })
},
bookStocks:(payload)=>{
    return new Promise((resolve,reject)=>{
        BookDAO.getBook(payload).then(result=>{
            resolve({response:{name:result[0].title,bookId:result[0].bookId,stocks:result[0].stocks}});
        }).catch(error=>{
            reject(error)
        })
    })
},
}



module.exports = BookService;
