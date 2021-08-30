const express = require('express')
const app = express()
const port = 3000;

const  bodyParser = require('body-parser');
 app.use(bodyParser.json());
 require('./db');

 app.use('/users',require('./controller/user-controller'));
 app.use('/books',require('./controller/book-controller'));
 app.use('/orders', require('./controller/order-controller'));


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

// http://localhost:3000/users/storeUser


