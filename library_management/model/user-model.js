const mongoose = require('../db');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
 email: {
    type: String,
    required: true

  },
  password: {
    type: String,
    required: true

  },

  phone: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'STUDENT'],
    required: true
  }
});

module.exports = mongoose.model('users', UserSchema);