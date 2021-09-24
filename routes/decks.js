var express = require('express');
var router = express.Router();
const decksCtrl = require('../controllers/decks');

router.get('/', decksCtrl.index);
router.get('/search', decksCtrl.search);
router.get('/new', decksCtrl.new);
router.get('/:id', decksCtrl.show);
router.get('/:id/search', decksCtrl.searchShow)
router.delete('/:id', decksCtrl.delete);
router.post('/:id', decksCtrl.addCard);
router.delete('/:id/delete/:cardId', decksCtrl.deleteCard);
router.put('/:id', decksCtrl.updateName);

module.exports = router;
