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
    },
    updateStock:(bookId, value)=>{
        return BookModel.updateOne({bookId:bookId}, {$inc:{stocks:value}});
    }
   
}

module.exports = BookDAO;