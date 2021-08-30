const express = require('express')
const router = express.Router();
const TokenService = require('../service/token-service');

const OrderService = require('../service/order-service');

router.post('/issueBook',TokenService.isAuthenticate, function(req, res){
   
    OrderService.issueBook(req.body,req.user.role).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })


})
router.get('/bookStatus', function(req, res){
   
    OrderService.bookStatus(req.query).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })


})
router.put('/returnBook',TokenService.isAuthenticate, function(req, res){
   
    OrderService.returnBook(req.body, req.user.role).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })


})

module.exports = router;