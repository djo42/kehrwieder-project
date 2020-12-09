var express = require('express')
var router = express.Router()
var base64 = require('base-64')
var axios = require('axios')

require('dotenv').config()

router.get('/:api', async (req, res) => {
  const requeststr = req.originalUrl
  const baseurl = req.baseUrl
  const api = req.params['api']
  const replacestr = baseurl + '/' + api
  const parameters = requeststr.replace(replacestr, '')
  const entrypoint = process.env.SX_ENTRY_POINT
  const basicauth =
    'Basic ' +
    base64.encode(process.env.SX_BASIC_USER + ':' + process.env.SX_BASIC_PASS)
  const apiuser = 'kdna=' + process.env.SX_API_USER
  const apipass = 'pwd=' + process.env.SX_API_PASS
  const apirequest =
    entrypoint +
    api +
    '_2.01.json' +
    parameters.replace('?', '?' + apiuser + '&' + apipass + '&') +
    '&language=en_US'

  const response = await axios.get(apirequest, {
    headers: {
      Authorization: basicauth,
    },
  })
  // passing data back
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response.data))
})

module.exports = router
