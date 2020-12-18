import './App.css'
import { getVehicles } from './services'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function App() {
  const [list, setList] = useState([])
  const [display, setDisplay] = useState([])
  const [filter, setFilter] = useState({})
  const api = process.env.REACT_APP_SX_VEHICLE
  const parameters = '?cit=110'

  console.log(api + parameters)

  useEffect(() => {
    getVehicles(api, parameters).then((res) => setList(res.data.Result.Cars))
  },[api, parameters])

  useEffect(() => {
    setDisplay(list)
  }, [list])

  function resetFilter() {
    setFilter({})
    setDisplay(list)
  }

  function applyFilter() {
    const filtered = list.filter(function (item) {
      for (var key in filter) {
        if (item[key] === undefined || item[key] !== filter[key]) return false
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
      <Button onClick={() => changeFilter('HasAutomaticTransmission')}>
        Gearbox
      </Button>
      <Button onClick={() => changeFilter('HasAirCondition')}>A/C</Button>
      <Button onClick={() => resetFilter()}>Reset</Button>
      {display.map((car, index) => (
        <Card key={index} {...car}>
          <Headline>
            {display[index].Examples[0] +
              ', ' +
              display[index].Examples[1] +
              ' or similar'}
          </Headline>
          <img
            className="Car-Pic"
            src={display[index].ImageUrl}
            alt="cool car"
          />
          <Button>Rent me</Button>
        </Card>
      ))}
    </>
  )
}

const Headline = styled.h3`
  color: hotpink;
  font-size: 1rem;
`
const Card = styled.div`
  background: white;
  border-radius: 3px;
  border: lightgrey;
  border-size: 1px;
  box-shadow: 4px 4px 5px 2px rgba(0, 0, 255, .2);
  color: white;
  margin: 2em 1em;
  padding: 1em 1em;

  }
`
const Button = styled.button`
  display: flexbox;
  margin-left: auto;
  margin-right: auto;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: forestgreen;
  color: white;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, 
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
  transform: scale(0.99);
}`
