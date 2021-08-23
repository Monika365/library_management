const mongoose = require('../db');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
  nameOfBook: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },

  StatusOfBook : {
    type: String,
    required: true
  },
  fromDate : {
    type: Date,
    required: true
  },
  totalPenalty:{
    type: Number,
    required: true
  },
  toDate:{
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('books', UserSchema);