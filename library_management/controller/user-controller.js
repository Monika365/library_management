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


router.put('/updateUser/:id', function (req, res) {
    console.log(req.params, req.body);

    UserService.updateUser(req.params, req.body).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;