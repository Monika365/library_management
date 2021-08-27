const mongoose = require('../db');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  orderId:{
      type:String,
      required:true
  },
 issueDate: {
    type: Date,
    default:Date.now
  },
  returnDate: {
    type: Date,
    required: true
  },
  penalty:{
    type:Number,
    default:0
  },
  status:{
      type:String,
      default:"ISSUED"
  }

  
});

module.exports = mongoose.model('orders', orderSchema);