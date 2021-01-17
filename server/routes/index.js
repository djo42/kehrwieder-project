var express = require('express')
var router = express.Router()
var schedule = require('node-schedule')
var base64 = require('base-64')
var handler = require('./api/handler.js')
const mongoose = require('mongoose')

var j = schedule.scheduleJob('0 2 * * SUN', async function () {
  const basicauth = `Basic ${base64.encode(
    `${process.env.SX_BASIC_USER}:${process.env.SX_BASIC_PASS}`
  )}`
  const apiuser = `kdna=${process.env.SX_API_USER}&pwd=${process.env.SX_API_PASS}`

  const endpoint = `${
    process.env.SX_API_URL + process.env.SX_STATION
  }_2.01.json?${apiuser}&cits[]&language=en_US`

  const response = await handler
    .apicall(endpoint, basicauth)
    .catch((error) => console.log(error))
  
  const branches = response.data.Result.Stations

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

  db.dropCollection('cities', function (err, result) {
    console.log(result)
  })

  db.dropCollection('shortcities', function (err, result) {
    console.log(result)
  })  

  branches.forEach(function (branch) {
    console.log(branch.Name)
    db.collection('cities').insertOne(branch)
  })
  db.collection('cities').find(
    {},
    { projection: { Name: 1, StationID: 1, "Address.Country": 1 } },
    async function (err, result) {
      if (err) {
        console.log(err)
      } else {
        arr = await result.toArray()
        //console.log(arr)
        var arrToString = JSON.stringify(Object.assign(arr)) // convert array to string
        var shortcit = JSON.parse(arrToString) // convert string to json object

        shortcit.forEach(function (city) {
          db.collection('shortcities').insertOne(city)
        })

        console.log("The End")
      }
    }
  )
  //console.log(db.listCollections())

  //console.log('The answer to life, the universe, and everything!')
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
