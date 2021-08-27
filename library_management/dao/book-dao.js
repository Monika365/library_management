const BookModel = require('../model/book-model');


const BookDAO = {
    storeBook:async (payload) => {


        return new userModel({
            title: payload.name,
            getId: payload.getId,
            stocks: payload.phone,
            role: payload.role,
            author: payload.password
        }).save();
    },
    getByCondition: (stocks) => {
        return userModel.findOne({stocks:stocks.length});
    }
}
module.exports = BookDAO;