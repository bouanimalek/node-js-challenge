const mongoose = require('mongoose')
const { Schema } = mongoose;


const identifierSchema = new Schema({
    cardCode: String,
    customer: {type: Schema.Types.ObjectId, ref: 'Customers'}
}) 

const Identifier = mongoose.model('Identifier', identifierSchema);

module.exports = Identifier;