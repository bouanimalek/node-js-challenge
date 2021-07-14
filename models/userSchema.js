const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname:  String, // String is shorthand for {type: String}
  lastname: String,
  email:   String,
  password: String,
  age: {type: Number, default: 10}
});

const User = mongoose.model('Users', userSchema);

module.exports = User;