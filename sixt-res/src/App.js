//import logo from './logo.svg'
import './App.css'
import { getVehicles } from './services'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function App() {
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    getVehicles().then((res) => setList(res.data.Result.Cars))
  }, [count])

  return (
    <>
      {list.map((car, index) => (
        <Card key={index} {...car}>
          <img className="Car-Pic" src={list[index].ImageUrl} alt="cool car" />
          <Button>Rent me</Button>
        </Card>
      ))}
    </>
  )
}

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
