const express = require('express')
const router = express.Router()

const OrderService = require('../service/order-service');

router.post('/issueBook', function(req, res){
   
    OrderService.issueBook(req.body).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })


})
module.exports = router;