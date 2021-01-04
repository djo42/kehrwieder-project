var express = require('express')
var router = express.Router()
var base64 = require('base-64')
var handler = require('./handler.js')

require('dotenv').config()

router.get('/', async (req, res) => {
  console.log("sixtdocs.js Original: " + req.originalUrl)
  const requeststr = req.originalUrl
  const parameters = requeststr.replace(
    `${req.baseUrl}/${req.params['api']}`,
    ''
  )
  const basicauth = `Basic ${base64.encode(
    `${process.env.SX_BASIC_USER}:${process.env.SX_BASIC_PASS}`
  )}`
  const apiuser = `kdna=${process.env.SX_API_USER}&pwd=${process.env.SX_API_PASS}`
  const endpoint = "https://res-soap.stage.sixt-payment.com/documents/Sixt-CodeTables-V2.01.xlsx"

  console.log("sixt.js server: " + endpoint)

  const response = await handler
    .apicall(endpoint, basicauth)
    .catch((error) => console.log(error))

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(response)
})

module.exports = router
