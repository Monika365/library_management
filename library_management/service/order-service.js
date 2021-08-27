const OrderDAO = require('../dao/order-dao');
const utils = require('../utils/utility');
const BookService = require('../service/book-service');
const OrderService = {

    issueBook: (payload) => {
        return new Promise(async(resolve, reject) => {
            let checkStock = await BookService.getBook({bookId:payload.bookId});
            if(!checkStock.response[0].stocks){
                return reject({'response':"No stock Available"});
            }
           // var myCurrentDate=new Date();
            var myPastDate=new Date();
                myPastDate.setDate(myPastDate.getDate() - 10);
                console.log('--',myPastDate);
            let orderDetail = await OrderDAO.isExist({bookId:payload.bookId, userId:payload.userId, issueDate:{"$lte":new Date(), "$gte":myPastDate}});
            if(orderDetail){
                let returnDate = orderDetail.returnDate.getDate() + '/'+ (orderDetail.returnDate.getMonth()+1)+'/'+ orderDetail.returnDate.getFullYear();
                reject({message:`Already order initiated with orderId of ${orderDetail.orderId} and return date is ${returnDate}`});
            }
            let returnDate = utils.getReturnDate(new Date(), 10);
            console.log('return date ', returnDate);
            payload['returnDate'] = returnDate.getDate() + '/'+ (returnDate.getMonth()+1)+'/'+ returnDate.getFullYear();
            payload['orderId'] = utils.getId('ODR',10);
            OrderDAO.issueBook(payload).then(result=>{
                resolve({response:`Book Issued and return date is ${returnDate} and orderid for book is ${payload.orderId} for the bookId ${payload.bookId}`});
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
}
}



module.exports = OrderService;
