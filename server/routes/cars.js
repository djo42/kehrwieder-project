var express = require('express');
var router = express.Router();
var vehicles = require('../data/VehicleModelList.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(vehicles));
});

module.exports = router;
