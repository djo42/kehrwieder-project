import './Availability.css'
import React, { useState, useEffect } from 'react'
import Offerdataform from '../components/Offerform.js'
import axios from 'axios'
import Filters from '../components/Filters.js'
import Inclusionslist from '../components/Inclusionslist.js'
import {
  OfferCardHeadline,
  Card,
  Pricedisplay,
  Button,
  Carpic,
  Textwrapper,
  Imgcontainer,
} from '../components/Components.js'

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

    localStorage.setItem('offer', JSON.stringify(result))
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
        <Card key={offer.AvailabilityRow} {...offer}>
          <Imgcontainer>
            <OfferCardHeadline>
              <Textwrapper>
                {offer.Car.Examples.join(', ').toUpperCase()}
              </Textwrapper>
            </OfferCardHeadline>
            <Carpic src={offer.Car.ImageUrl} alt={offer.Car.Examples[0]} />
          </Imgcontainer>
          <Inclusionslist offer={offer}></Inclusionslist>
          <Pricedisplay>
            Total Price: {display[index].Total.DueAmount}{' '}
            {display[index].Total.Currency}
          </Pricedisplay>
          <Button
            onClick={(e) => {
              e.preventDefault()
              window.location.href =
                '/availabilitydetails/' + offer.AvailabilityRow
            }}
          >
            Rent me
          </Button>
        </Card>
      ))}
    </>
  )
}