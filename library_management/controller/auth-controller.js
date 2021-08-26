const express = require('express')
const router = express.Router()

const AuthService = require('../service/auth-service');

router.post('/login', function (req, res) {

    AuthService.login(req.body).then((result) => {
        console.log('hi')
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})


// router.put('/updateUser/:id', function (req, res) {
//     console.log(req.params, req.body);

//     AuthService.updateUser(req.params, req.body).then((result) => {
//         res.status(201).send(result);
//     }).catch((error) => {
//         res.status(500).send(error);
//     })
// })

module.exports = router;