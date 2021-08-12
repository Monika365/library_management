const mongoose = require('../db');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
  name:{
      type:String,
      required: true
  },
  id:{
type: String,
required: true

  },

  contact:{
    type:Number,
    required: true
},
rollNo:{
    type:Number,
    required: true
}
});

module.exports = mongoose.model('users', UserSchema);