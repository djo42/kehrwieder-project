var express = require('express')
var router = express.Router()
var base64 = require('base-64')
var handler = require('./handler.js')
const mongoose = require('mongoose')

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

  console.log(endpoint)

  const response = await handler
    .apicall(endpoint, basicauth)
    .catch((error) => console.log(error))

  if (req.params['api'] === 'reservation') {
    const resdata = {
      resn: response.data.Result.Reservation.Number,
      secu: response.data.Result.Reservation.SecurityCode,
      rate: response.data.Result.Reservation.Rate.Code,
      ctyp: response.data.Result.Reservation.Car.Group,
      rate: response.data.Result.Reservation.Rate.Code,
      pric: response.data.Result.Reservation.Total.DueAmount,
      curr: response.data.Result.Reservation.Total.Currency,
    }

    mongoose
      .connect(process.env.SX_DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => console.log(error))

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('db connection estabished')
    })
    db.collection('reservation').insertOne(response.data)
  }

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(response.data)
})

module.exports = router
