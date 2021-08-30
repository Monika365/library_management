const OrderDAO = require('../dao/order-dao');
const utils = require('../utils/utility');
const BookService = require('../service/book-service');
const Constant = require('../utils/constant');
const OrderService = {

    issueBook: (payload, role) => {
        return new Promise(async(resolve, reject) => {
            if(role==Constant.ROLE.STUDENT)
            return reject({response:'You are not authorized to proceed this operation.'});
            let checkStock = await BookService.getBook({bookId:payload.bookId});// {response:[{name:''}]}
            if(checkStock.length>0 && !checkStock.response[0].stocks){
                return reject({'response':"No stock Available"});
            }
           // var myCurrentDate=new Date();
            var myPastDate=new Date();
                myPastDate.setDate(myPastDate.getDate() - 10);
                console.log('--',myPastDate);
            let orderDetail = await OrderDAO.isExist({bookId:payload.bookId, userId:payload.userId, issueDate:{"$lte":new Date(), "$gte":myPastDate}});
            if(orderDetail){
                let returnDate = orderDetail.returnDate.getDate() + '/'+ (orderDetail.returnDate.getMonth()+1)+'/'+ orderDetail.returnDate.getFullYear();
              return reject({message:`Already order initiated with orderId of ${orderDetail.orderId} and return date is ${returnDate}`});
            }
            let returnDate = utils.getReturnDate(new Date(), 10);
            console.log('return date ', returnDate);
            payload['returnDate'] = returnDate.getDate() + '/'+ (returnDate.getMonth()+1)+'/'+ returnDate.getFullYear();
            payload['orderId'] = utils.getId('ODR',10);
            OrderDAO.issueBook(payload).then(async result=>{
                await BookService.updateStock(payload.bookId,-1);
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
},
bookStatus:(payload)=>{
    return new Promise((resolve,reject)=>{
        OrderDAO.isExist(payload).then(result=>{
            if(result){
                if(result.status=='RETURNED'){
                    // let penalty = utils.getPenalty(result.returnDate,new Date());
                    resolve({response:`The book with ${result.bookId} having the detail: - (studentId:=${result.userId}  orderId:=${result.orderId}  status:=${result.status}  returned on:=${result.returnOn.getDate()}/${result.returnOn.getMonth()+1}/${result.returnOn.getFullYear()}  penalty:=${result.penalty}`});
                
                }else{
                    let penalty = utils.getPenalty(result.returnDate,new Date());
                    resolve({response:`The book with ${result.bookId} having the detail: - (studentId:=${result.userId}  orderId:=${result.orderId}  status:=${result.status}  returnDate:=${result.returnDate.getDate()}/${result.returnDate.getMonth()+1}/${result.returnDate.getFullYear()}  penalty:=${penalty}`});
                
                
                }
               }

        }).catch(error=>{
            reject(error)
        })
    })
},

returnBook:(payload, role)=>{
    return new Promise((resolve,reject)=>{
        if(role==Constant.ROLE.STUDENT)
            return reject({response:'You are not authorized to proceed this operation.'});
        OrderDAO.isExist(payload).then(async result=>{
            if(result && result.status!='RETURNED'){
                let penalty = utils.getPenalty(result.returnDate,new Date());
                let updatePayload = {penalty:penalty,status:'RETURNED',returnOn:new Date()};
                await OrderDAO.returnBook(payload.orderId,updatePayload);
                await BookService.updateStock(result.bookId,1);
                resolve({response:`The book with ${result.bookId} having the detail: - (studentId:=${result.userId}  orderId:=${result.orderId}  status:=${result.status}  returnDate:=${result.returnDate.getDate()}/${result.returnDate.getMonth()+1}/${result.returnDate.getFullYear()}  penalty:=${penalty} is returned successfully`});
            }else{
                resolve({response:`The book with ${result.bookId} having the detail: - (studentId:=${result.userId}  orderId:=${result.orderId}  status:=${result.status}  returned On:=${result.returnOn.getDate()}/${result.returnOn.getMonth()+1}/${result.returnOn.getFullYear()}  penalty:=${result.penalty} is already returned.`});

            }

        }).catch(error=>{
            reject(error)
        })
    })
}

}



module.exports = OrderService;


