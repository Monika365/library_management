const mongoose = require('../db');

const Schema = mongoose.Schema;



const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  stocks: {
    type: Number,
    required: true
  },
 author: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('books', bookSchema);