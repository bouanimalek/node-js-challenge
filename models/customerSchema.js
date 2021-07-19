const mongoose = require('mongoose')
const { Schema } = mongoose;


const customerSchema = new Schema({
    name: String,
    age: Number,
    gender: String
})

const Customer = mongoose.model('Customers', customerSchema);

module.exports = Customer;