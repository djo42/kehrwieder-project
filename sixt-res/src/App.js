import './App.css'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Offerdataform from './Offerform.js'
import Carimage from './Carimage.js'
import axios from 'axios'
import Filters from './Filters.js'

export default function App() {
  const [list, setList] = useState([])
  const [display, setDisplay] = useState([])
  const [filter, setFilter] = useState({})

  //Call the API

  async function callSixt(apiname, parameters) {
    const result = await axios
      .get(`${process.env.REACT_APP_SX_API}${apiname}${parameters}`)
      .catch((error) => console.log(error))

    //console.log(result.data.Result.Offers)

    window.sessionStorage.setItem('offer', JSON.stringify(result))

    console.log(localStorage)
    console.log(sessionStorage)
    console.log(JSON.parse(sessionStorage.offer))

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
            <Headline>{offer.Car.Examples.join(', ')}</Headline>
            <Carpic
              src={display[index].Car.ImageUrl}
              alt={offer.Car.Examples[1]}
            />{' '}
          </Imgcontainer>

          <StyledTable>
            <tr>
              <th align="left">Included Extras</th>
            </tr>
            {offer.Extras.Included.map((item, index) => {
              return (
                <tr key={index} {...item}>
                  <td align="left">{item.Name}</td>
                </tr>
              )
            })}
          </StyledTable>

          <StyledTable>
            <tr>
              <th align="left">Coverage</th>
              <th align="right">Excess</th>
            </tr>
            {offer.Coverages.Included.map((item, index) => {
              return (
                <tr key={index} {...item}>
                  <td align="left">
                    {item.Name.replace('Collision Damage Waiver', 'CDW')}
                  </td>
                  <td align="right">
                    {Math.floor(item.Excess.Amount).toLocaleString('de-DE') +
                      ' ' +
                      item.Excess.Currency}
                  </td>
                </tr>
              )
            })}
          </StyledTable>

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

const Headline = styled.h3`
  display: inline;
  text-align: left;
  position: absolute;
  top: 5px;
  left: 0;
  background: black;
  color: white;
  font-size: 1.1em;
  padding: 5px;
  margin: 10px;
  margin-bottom: 10px;
`
const Card = styled.div`
  width: auto;
  padding: 0;
  margin: 20px;
  margin-top: 40px;
  background: white;
  
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  color: black;
  }
`
//linear-gradient(180deg, #8EA9D6ff, #99CED4ff, #E4E0DFff)
const Pricedisplay = styled.div`
  text-align: left;
  color: black;
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

const Carpic = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
  padding-top:10px;
`

const Imgcontainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 5px;
  border-radius: 10px 10px 0 0;

`

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  padding: 20px;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: center;
  }              */
  td,
  th {
    border: none;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 5px;
    font-size: 1em;
    margin: 0;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`

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
