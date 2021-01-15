var express = require('express')
var router = express.Router()
require('dotenv').config()
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
  mongoose
    .connect(process.env.SX_DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error))

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('we are connected!')
  })

  db.collection('cities').find(
    {},
    { limit: 100, projection: { Name: 1 } },
    async function (err, result) {
      if (err) {
        console.log(err)
      } else {
        array = await result.toArray()
        console.log(array)
        var arrayToString = JSON.stringify(Object.assign([], array)) // convert array to string
        var stringToJsonObject = JSON.parse(arrayToString) // convert string to json object
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.json(stringToJsonObject)
      }
    }
  )
})

module.exports = router
