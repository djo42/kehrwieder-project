var express = require('express')
var router = express.Router()
var base64 = require('base-64')
var handler = require('./handler.js')

require('dotenv').config()

router.get('/:api', async (req, res) => {
  console.log(req.originalUrl)
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

  console.log(endpoint)

  const response = await handler
    .apicall(endpoint, basicauth)
    .catch((error) => console.log(error))

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(response.data)
})

module.exports = router

/* 'http://localhost:3000' */
