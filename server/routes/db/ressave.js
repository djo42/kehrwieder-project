var express = require('express')
var router = express.Router()
require('dotenv').config()

router.post('/', async (req, res) => {
  const MongoClient = require('mongodb').MongoClient

  MongoClient.connect(process.env.SX_DB_CONNECT, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })
})

module.exports = router
