const bookDAO = require('../dao/book-dao');
const utils = require('../utils/utility');
const bookService = {

    createBook: (payload) => {
        return new Promise((resolve, reject) => {
            let userId = utils.getUserId(payload.role, 4);
            payload['userId']= userId;
            bookDAO.createBook(payload).then((result) => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })

    }
}