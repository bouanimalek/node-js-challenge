const mongoose = require('mongoose')
const { Schema } = mongoose;


const tagSchema = new Schema({
    name: String,
    slug: String,
    tutorials: [{type: Schema.Types.ObjectId, ref: 'Tutorials'}]
})

const Tag = mongoose.model('Tags', tagSchema);

module.exports = Tag;