var express = require('express')
var router = express.Router()
var base64 = require('base-64')
var axios = require('axios')

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


  async function apicall(url, login) {
    const feedback = await axios
      .get(url, {
        headers: {
          Authorization: login,
        },
      })
      .catch((err) => console.log(err))

    return feedback.data
  }

  const response = await apicall(endpoint, basicauth)

  // passing data back
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response))
})

module.exports = router

/*   console.log(requeststr)
  console.log(parameters)
  console.log(endpoint)
  console.log(req.params['api']) */