var express = require('express')
var router = express.Router()
var axios = require('axios')

router.get('/', async (req, res) => {
  const requeststr = process.env.FX_ENTRY_POINT + '?' + process.env.FX_API_CODE

  const response = await axios.get(requeststr)
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response.data))
})

module.exports = router
