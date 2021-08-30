const OrderModel = require('../model/order-model');


const OrderDAO = {
    issueBook: (payload) => {
        return new OrderModel({
            bookId: payload.bookId,
            userId:payload.userId,
            orderId:payload.orderId,
            returnDate: payload.returnDate
        }).save();
    },
    
    isExist:(condition)=>{
        return OrderModel.findOne(condition);
    },
    returnBook:(orderId,payload)=>{
        return OrderModel.updateOne({orderId:orderId}, {$set:payload});
    }
}

module.exports = OrderDAO;