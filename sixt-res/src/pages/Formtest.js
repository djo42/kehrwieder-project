import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Autofillform() {
  const [branches, setBranches] = useState([])
  
  useEffect(() => {
    getBranches()
  },[])

  async function getBranches() {
    const result = await axios
      .get(process.env.REACT_APP_BACKEND + '/db')
      .catch((error) => console.log(error))

    console.log(result.data)

    setBranches(result.data)
  }

  return (
    <Typeahead
      single
      clearButton
      onChange={(selected) => {
        if (selected[0] === undefined || null) {
        } else {
          console.log(selected[0].StationID)
        }
        // Handle selections...
      }}
      options={branches}
      labelKey={(option) => `${option.Name} (${option.Address.Country})`}
      size="small"
      minLength="3"
    />
  )
}
