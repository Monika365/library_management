var express = require('express')
var router = express()



router.post('/createBook', function (req, res) {

    UserService.storeUser(req.body).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})
