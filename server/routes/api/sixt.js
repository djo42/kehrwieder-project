var express = require('express')
var router = express.Router()
var base64 = require('base-64')
var handler = require('./handler.js')
const mongoose = require('mongoose')
mongoose.connect(process.env.SX_DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
var db = mongoose.connection

require('dotenv').config()

router.get('/:api', async (req, res) => {
  const requeststr = req.originalUrl
  const parameters = requeststr.replace(
    `${req.baseUrl}/${req.params['api']}`,
    ''
  )
  const basicauth = `Basic ${base64.encode(
    `${process.env.SX_BASIC_USER}:${process.env.SX_BASIC_PASS}`
  )}`
  const apiuser = `kdna=${process.env.SX_API_USER}&pwd=${process.env.SX_API_PASS}`
  const endpoint = `${
    process.env.SX_API_URL + req.params['api']
  }_2.01.json${parameters.replace('?', '?' + apiuser + '&')}&language=en_US`

  const response = await handler
    .apicall(endpoint, basicauth)
    .catch((error) => console.log(error))

  if (req.params['api'] === 'reservation') {
    db.collection('reservation').insertOne(response.data)
  }

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(response.data)
})

module.exports = router
