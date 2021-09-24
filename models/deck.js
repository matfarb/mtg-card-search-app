const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: String,
    cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
});

module.exports = mongoose.model('Deck', deckSchema);