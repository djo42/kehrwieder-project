var express = require('express');
var router = express.Router();
var countries = require('../data/countryList.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(countries));
});

module.exports = router;
