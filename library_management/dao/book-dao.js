const BookModel = require('../model/book-model');


const BookDAO = {
    storeBook: (payload) => {
        return new BookModel({
            title: payload.title,
            bookId: payload.bookId,
            stocks: payload.stocks,
            author: payload.author
        }).save();
    },
    getByTitle: (title) => {
        return BookModel.findOne({title:title});
    },
    getBook:(condition)=>{
        return BookModel.find(condition);
    }
   
}

module.exports = BookDAO;