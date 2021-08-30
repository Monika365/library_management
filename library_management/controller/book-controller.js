const express = require('express')
const router = express.Router()

const BookService = require('../service/book-service');
const TokenService = require('../service/token-service');
router.post('/storeBook', TokenService.isAuthenticate, function(req, res){
    console.log('req user detail--', req.user);
    BookService.storeBook(req.body, req.user.role).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })


})
router.get('/getBook',function(req, res){
    BookService.getBook(req.query).then((result)=>{
        res.status(201).send(result);
}).catch((error) => {
        res.status(500).send(error);
    })


})
router.get('/bookStocks/:bookId',function(req, res){
    BookService.bookStocks(req.params).then((result)=>{
        res.status(201).send(result);
}).catch((error) => {
        res.status(500).send(error);
    })


})


router.put('/updateStock',TokenService.isAuthenticate,function(req, res){
    BookService.updateStock(req.body.bookId,req.body.stocks, req.user.role).then((result)=>{
        res.status(201).send(result);
}).catch((error) => {
        res.status(500).send(error);
    })


})

module.exports = router;