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

  db.collection('companies').find(
    {},
    async function (err, result) {
      if (err) {
        console.log(err)
      } else {
        array = await result.toArray()
        console.log(array)
        var obj = JSON.stringify(Object.assign([], array)) // convert array to string
        var response = JSON.parse(obj) // convert string to json object
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.json(response)
      }
    }
  )
})

module.exports = router
