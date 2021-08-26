const express = require('express')
const router = express.Router()

const UserService = require('../service/user-service');

router.post('/storeUser', function (req, res) {

    UserService.storeUser(req.body).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

router.post('/login', function (req, res) {
    console.log('req payload login ', req.body);
    UserService.login(req.body).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})




module.exports = router;