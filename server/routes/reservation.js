var express = require('express');
var router = express.Router();
var reservation = require('../data/reservationResponse.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(reservation));
});

module.exports = router;
