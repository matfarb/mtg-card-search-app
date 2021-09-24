const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: String,
    imageUrl: String
});

module.exports = mongoose.model('Card', cardSchema);