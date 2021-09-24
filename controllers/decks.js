const Deck = require('../models/deck');
const Card = require('../models/card')
const request = require('request');

let results;
let deck;

function index(req, res){
    Deck.find({}, function(err, decks){
        res.render('decks/index', {decks, results: null});
    });
};

async function search(req, res){
    let decks = await Deck.find({})
    const searchText = req.query.searchtext;
    const color = req.query.color;
    const newColor = color.join("|");
    const cmc = req.query.cmc;
    const types = req.query.types;
    const newTypes = types.join("|");
    const url = `https://api.magicthegathering.io/v1/cards?name=${searchText}&colorIdentity=${newColor}&cmc=${cmc}&types=${newTypes}`
    if(req.query){
        request(url, function(error, response, body){
            let apiResponse = JSON.parse(body)
            results = apiResponse.cards;
            res.render('decks/index', {results, decks});  
        });
    }else{
        res.render('decks/index', {results:null, decks});
    }
    console.log(req.query);    
}

async function show(req, res){
    deck = await Deck.findById(req.params.id).populate('cards');
    res.render('decks/show', {deck, results});
};

function newDeck(req, res) {
    const newDeck = new Deck();
    newDeck.name = "New Deck"
    newDeck.save(function(err){
        console.log(newDeck)
        res.redirect('/decks')
    })
}

async function searchShow(req, res){
    deck = await Deck.findById(req.params.id).populate('cards');
    const searchText = req.query.searchtext;
    const color = req.query.color;
    const newColor = color.join("|");
    const cmc = req.query.cmc;
    const types = req.query.types;
    const newTypes = types.join("|");
    const url = `https://api.magicthegathering.io/v1/cards?name=${searchText}&colorIdentity=${newColor}&cmc=${cmc}&types=${newTypes}`
    if(req.query){
        request(url, function(error, response, body){
            let apiResponse = JSON.parse(body)
            results = apiResponse.cards;
            res.render('decks/show', {deck, results});  
        });
    }else{
        res.render('decks/show', {deck, results});
    }    
}

function deleteDeck(req, res){
    const id = {_id: req.params.id};
    Deck.findOneAndDelete(id, function(err) {
        if (!err) {
            res.redirect('/decks');
        }
        else {
            message.type = 'error';
        }
    });
};

async function addCard(req, res) {
    const card = new Card({
        name: req.body.name,
        imageUrl: req.body.imageUrl
    });
    await card.save()
    await Deck.findOneAndUpdate({_id:req.params.id}, {$push:{'cards':card}})
    deck = await Deck.findById(req.params.id).populate('cards');
    res.render('decks/show', {deck, results}); 
}

async function deleteCard (req, res){
    await Card.deleteOne({
       _id: req.params.cardId
    });
    res.redirect(`/decks/${req.params.id}`)
}

function updateName(req, res){
    const id = {_id: req.params.id};
    const deckName = req.body.deckName;
    Deck.findOneAndUpdate(id, {$set:{name: deckName}}, {new: true}, function(err) {
        if (!err) {
            res.redirect(`/decks/${req.params.id}`);
        }
        else {
            message.type = 'error';
        }
    });
}

module.exports = {
    index,
    search,
    show,
    new: newDeck,
    searchShow,
    delete: deleteDeck,
    addCard,
    deleteCard,
    updateName
  };
