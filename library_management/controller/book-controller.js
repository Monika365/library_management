const express = require('express')
const router = express.Router()

const BookService = require('../service/book-service');

router.post('/storeBook', function(req, res){
   
    BookService.storeBook(req.body).then((result) => {
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
module.exports = router;