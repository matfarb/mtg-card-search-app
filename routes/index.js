var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  const url = {
    method: "GET",
    url: "https://api.magicthegathering.io/v1/cards"
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
