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
  },
  getId: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN'],
    required: true
  }
  
});

module.exports = mongoose.model('books', bookSchema);