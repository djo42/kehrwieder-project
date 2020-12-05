var express = require('express');
var router = express.Router();
var availability = require('../data/availability.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(availability));
});

module.exports = router;
