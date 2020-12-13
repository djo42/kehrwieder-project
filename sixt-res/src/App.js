//import logo from './logo.svg'
import './App.css'
import { getVehicles } from './services'
import React, { useState, useEffect } from 'react'

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    getVehicles().then((res) => setList(res.data.Result.Cars))
    //.then((datalist) => setList(datalist.Result))
  }, [])

  const link = (list[0].ImageUrl)

  return (
    <div className="App">
      <header className="App-header">
        <img src={link} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
