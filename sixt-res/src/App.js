import './App.css'
//import { getSixt } from './services'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Offerdataform from './Offerform.js'
import axios from 'axios'

export default function App() {
  const [list, setList] = useState([])
  const [display, setDisplay] = useState([])
  const [filter, setFilter] = useState({})

  //Call the API

  async function callSixt(apiname, parameters) {
    const result = await axios
      .get(`${process.env.REACT_APP_SX_API}${apiname}${parameters}`)
      .catch((error) => console.log(error))

    console.log(result.data.Result.Offers)
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
      <Filterbar>
        <Container onClick={() => changeFilter('HasAutomaticTransmission')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            preserveAspectRatio="xMidYMid meet"
            width="50%"
            height="50%"
          >
            <path
              fill="black"
              d="M11,13 L8,13 L8,18 L6,18 L6,6 L8,6 L8,11 L11,11 L11,6 L13,6 L13,11 L16,11 L16,6 L18,6 L18,13 L13,13 L13,18 L11,18 L11,13 Z M8,4 L6,4 L6,2 L8,2 L8,4 Z M12.9997,4.0001 L10.9997,4.0001 L10.9997,2.0001 L12.9997,2.0001 L12.9997,4.0001 Z M18,4 L16,4 L16,2 L18,2 L18,4 Z M12.9997,22.0001 L10.9997,22.0001 L10.9997,20.0001 L12.9997,20.0001 L12.9997,22.0001 Z M8,22 L6,22 L6,20 L8,20 L8,22 Z"
            ></path>
          </svg>
        </Container>
        <Container onClick={() => changeFilter('HasAirCondition')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            preserveAspectRatio="xMidYMid meet"
            width="50%"
            height="50%"
          >
            <polygon
              fill="#191919"
              points="8.259 15.222 7.3 18.801 5.368 18.284 5.826 16.574 3.486 17.874 2.514 16.126 4.603 14.965 3.241 14.6 3.759 12.668 7.118 13.568 9.94 12 7.118 10.432 3.76 11.332 3.242 9.4 4.604 9.035 2.514 7.874 3.486 6.126 5.827 7.427 5.369 5.716 7.301 5.199 8.26 8.778 11 10.301 11 7.071 8.459 4.53 9.873 3.116 11 4.242 11 2 13 2 13 4.243 14.128 3.115 15.542 4.53 13 7.071 13 10.301 15.741 8.778 16.7 5.199 18.632 5.716 18.174 7.426 20.514 6.126 21.486 7.874 19.397 9.035 20.759 9.4 20.241 11.332 16.882 10.432 14.059 12 16.884 13.57 20.241 12.669 20.759 14.601 19.398 14.966 21.486 16.126 20.514 17.874 18.173 16.574 18.632 18.286 16.7 18.803 15.741 15.222 13 13.7 13 16.929 15.541 19.47 14.127 20.884 13 19.757 13 22 11 22 11 19.757 9.872 20.884 8.458 19.47 11 16.929 11 13.699"
            ></polygon>
          </svg>
        </Container>
        <Container onClick={() => resetFilter()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            preserveAspectRatio="xMidYMid meet"
            width="50%"
            height="50%"
          >
            <path
              fill="#191919"
              d="M12,8.406 C12,6.95572761 10.9624744,6 9.4594,6 C8.05803939,6 7,7.04664702 7,8.406 C7,9.81852498 8.10931602,11 9.4594,11 C10.9042369,11 12,9.91018444 12,8.406 Z M14,8.406 C14,11.017198 12.006377,13 9.4594,13 C6.97558879,13 5,10.8959027 5,8.406 C5,5.93720183 6.95828756,4 9.4594,4 C12.0320353,4 14,5.81281142 14,8.406 Z M3.93632918,19.3511234 L2.06367082,18.6488766 C2.11647234,18.5080725 2.21091202,18.2730226 2.34165517,17.9741812 C2.55916776,17.4770095 2.80183291,16.9792349 3.06592446,16.5097388 C3.94654645,14.9441886 4.83172322,14 6,14 L13,14 C14.1682768,14 15.0534535,14.9441886 15.9340755,16.5097388 C16.1981671,16.9792349 16.4408322,17.4770095 16.6583448,17.9741812 C16.789088,18.2730226 16.8835277,18.5080725 16.9363292,18.6488766 L15.0636708,19.3511234 C15.0227223,19.2419275 14.9413808,19.0394774 14.8260302,18.7758188 C14.6333865,18.3354905 14.4190204,17.8957651 14.1909245,17.4902612 C13.9105829,16.9918762 13.6309243,16.5851 13.3720253,16.3089411 C13.1617992,16.0847 13.018868,16 13,16 L6,16 C5.98113199,16 5.83820078,16.0847 5.6279747,16.3089411 C5.36907575,16.5851 5.08941713,16.9918762 4.80907554,17.4902612 C4.58097959,17.8957651 4.36661349,18.3354905 4.17396983,18.7758188 C4.05861923,19.0394774 3.97727766,19.2419275 3.93632918,19.3511234 Z M17,16 L17,14 L19,14 C20.1682768,14 21.0534535,14.9441886 21.9340755,16.5097388 C22.1981671,16.9792349 22.4408322,17.4770095 22.6583448,17.9741812 C22.789088,18.2730226 22.8835277,18.5080725 22.9363292,18.6488766 L21.0636708,19.3511234 C21.0227223,19.2419275 20.9413808,19.0394774 20.8260302,18.7758188 C20.6333865,18.3354905 20.4190204,17.8957651 20.1909245,17.4902612 C19.9105829,16.9918762 19.6309243,16.5851 19.3720253,16.3089411 C19.1617992,16.0847 19.018868,16 19,16 L17,16 Z M15,6 L15,4 L16,4 C18.1521499,4 20,6.05316681 20,8.5 C20,10.9468332 18.1521499,13 16,13 L15,13 L15,11 L16,11 C16.9978501,11 18,9.88650014 18,8.5 C18,7.11349986 16.9978501,6 16,6 L15,6 Z"
            ></path>
          </svg>
        </Container>
      </Filterbar>
      {display.map((offer, index) => (
        <Card key={offer.AvailabilityRow} {...offer}>
          <Headline>{offer.Car.Examples.join(', ')}</Headline>
          <img
            className="Car-Pic"
            src={display[index].Car.ImageUrl}
            alt="cool car"
          />

          <Extralist>
            {offer.Extras.Included.map((item, index) => {
              return (
                <li key={index} {...item}>
                  {item.Name}
                </li>
              )
            })}
          </Extralist>
          <Extralist>
            {offer.Coverages.Included.map((item, index) => {
              return (
                <ul>
                  {' '}
                  <li key={index} {...item}>
                    {item.Name +
                      ' (Excess: ' +
                      item.Excess.Amount +
                      ' ' +
                      item.Excess.Currency +
                      ')'}
                  </li>
                </ul>
              )
            })}
          </Extralist>

          {console.log(...display[index].Coverages.Included)}

          <Pricedisplay>
            Total Price: {display[index].Total.DueAmount}{' '}
            {display[index].Total.Currency}
          </Pricedisplay>
          <Filterbutton>Rent me</Filterbutton>
        </Card>
      ))}
    </>
  )
}

const Filterbar = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px;
  max-height: 100px;
`

const Extralist = styled.div`
  color: purple;
  font-size: 0.8em;
  margin: 5px 0 5px 20px;
`

const Headline = styled.h3`
  color: purple;
  font-size: 1.25em;
  margin: 5px 0 5px 20px;
`
const Card = styled.div`
  background: white;
  border-radius: 3px;
  border: lightgrey;
  border-size: 1px;
  box-shadow: 4px 4px 5px 2px rgba(0, 0, 255, .2);
  color: white;
  width:90%;
  margin: 2em 1em;
  padding: 1em 1em;

  }
`

const Container = styled.div`
  align-items: center;
  font-size: 0.75em;
  padding-right: 1.5625rem;
  text-align: center;
  height: auto;
  width: auto;
  padding-bottom: 0;
  vertical-align: middle;
  margin: 10px;
`

const Pricedisplay = styled.div`
  text-align: left;
  color: purple;
  font-style: normal;
  font-weight: bold;
  font-family: Roboto;
  font-size: 1.2em;
  height: 50px;
  margin-top: 12px;
`

const Filterbutton = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  padding: 0;
  margin: 10px;
  text-decoration: none;
  background: forestgreen;
  color: white;
  font-family: sans-serif;
  font-size: 10px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;
}`

/*   transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  }

  &:hover,
  &:focus {
  background: #0053ba;
  }

  &:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
  }

  &:active {
  transform: scale(0.99); */
