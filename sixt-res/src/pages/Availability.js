import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { Button, Card, ListGroupItem } from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import Filters from '../components/Filters.js'
import Inclusionslist from '../components/Inclusionslist.js'
import Offerdataform from '../components/Offerform.js'
import './Availability.css'

export default function Availability() {
  const [list, setList] = useState([])
  const [display, setDisplay] = useState([])
  const [filter, setFilter] = useState({})

  //Call the API

  async function callSixt(apiname, parameters) {
    const result = await axios
      .get(`${process.env.REACT_APP_SX_API}${apiname}${parameters}`)
      .catch((error) => console.log(error))

    //window.sessionStorage.setItem('offer', JSON.stringify(result))

    //localStorage.setItem('offer', JSON.stringify(result))
    localStorage.removeItem('offer')
    //localStorage.removeItem('sxres')
    //window.sessionStorage.removeItem('offer')
    console.log(localStorage)

    setList(result.data.Result.Offers)
  }

  //Transfer API result into dynamic state 'display'

  useEffect(() => {
    setDisplay(list)
  }, [list])

  //Reset the car feature filter

  function resetFilter() {
    setFilter({})
    setDisplay(list)
    console.log('Display: ' + display)
  }

  function applyFilter() {
    const filtered = list.filter(function (item) {
      for (var key in filter) {
        if (item.Car[key] === undefined || item.Car[key] !== filter[key])
          return false
      }
      return true
    })
    console.log(filtered)
    setDisplay(filtered)
  }

  function changeFilter(feature) {
    var carfeatures = filter
    const acfilt = carfeatures.hasOwnProperty(feature)

    acfilt ? delete carfeatures[feature] : (carfeatures[feature] = true)

    setFilter(carfeatures)
    console.log(filter)
    applyFilter()
  }

  return (
    <>

      <Offerdataform handleClick={callSixt} />
      <Filters changeFilter={changeFilter} resetFilter={resetFilter} />
      {display.map((offer, index) => (
        <Card className="margin-bottom-20" key={offer.AvailabilityRow} {...offer}>
          <Card.Img
            variant="top"
            src={offer.Car.ImageUrl}
            alt={offer.Car.Examples[0]}
          />
          <Card.Body>
            <Card.Title>
              {offer.Car.Examples.join(', ').toUpperCase()}
            </Card.Title>
            <Inclusionslist offer={offer}></Inclusionslist>
            <Card.Text>
              Total Price: {display[index].Total.DueAmount}{' '}
              {display[index].Total.Currency}
            </Card.Text>
            <Button
              variant="success"
              onClick={(e) => {
                e.preventDefault()
                window.location.href =
                  '/availabilitydetails/' + offer.AvailabilityRow
              }}
            >
              Rent me
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
