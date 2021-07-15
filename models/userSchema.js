const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname:  String, // String is shorthand for {type: String}
  lastname: String,
  email:   String,
  password: String,
  age: {type: Number, default: 10},
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todos'}]
});

const User = mongoose.model('Users', userSchema);

module.exports = User;