const mongoose = require('mongoose')
const { Schema } = mongoose;


const tutorialSchema = new Schema({
    title: String,
    author: String,
    tags: [{type: Schema.Types.ObjectId, ref: 'Tags'}]
})

const Tutorial = mongoose.model('Tutorials', tutorialSchema);

module.exports = Tutorial;