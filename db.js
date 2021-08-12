const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/librarydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, ()=>{
    console.log("succesfully connected to the database");
});

module.exports = mongoose;