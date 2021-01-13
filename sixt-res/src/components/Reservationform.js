import React from 'react'
import { Textwrapper, Headline } from './Components.js'
import { Button, Card } from 'react-bootstrap'
import FormKit from 'react-bootstrap-formkit'

export default function Reservationform({ handleClick, avrw }) {
  const initialFormData = Object.freeze({
    anr: '',
    nam1: '',
    nam2: '',
    emai: '',
  })

  const offerid = avrw

  const [formData, updateFormData] = React.useState(initialFormData)

  function serialize(obj, avrw) {
    var req = {
      anr: obj.anr,
      nam1: obj.nam1,
      nam2: obj.nam2,
      emai: obj.emai,
      age: process.env.REACT_APP_SX_AGE1,
      avrw: offerid,
    }
    console.log(req)

    var str = []
    for (var p in req)
      if (req.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(req[p]))
      }

    const querystr = '?' + str.join('&')

    console.log('reservation' + querystr)

    handleClick('reservation', querystr)
  }

  const handleChange = (event) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [event.target.name]: event.target.value.trim(),
    })
  }

  const handleSubmit = (formData) => {
    //event.preventDefault()
    console.log(formData)
    serialize(formData)
    // ... submit to API or something
  }

  let formGrid = [
    [
      {
        type: 'text',
        label: 'Title',
        key: '1',
        id: 'anr',
        onChange: { handleChange },
        name: 'anr',
      },
    ],
    [
      {
        type: 'text',
        label: 'Name',
        key: '2',
        id: 'nam1',
        onChange: { handleChange },
        name: 'nam1',
      },
    ],
    [
      {
        type: 'text',
        label: 'First Name',
        key: '3',
        id: 'nam2',
        onChange: { handleChange },
        name: 'nam2',
      },
    ],
    [
      {
        type: 'email',
        label: 'Email',
        key: '4',
        id: 'emai',
        onChange: { handleChange },
        name: 'emai',
      },
    ],
  ]

  let submitBtnInfo = {
    name: 'Submit',
    className: 'btn btn-outline-primary btn-md float-right',
  }

  let initialState = {
    anr: '1',
    nam1: 'John',
    nam2: 'Dennis',
    emai: 'dennis.john@kehrwieder.co.kr',
  }



  return (
    <Card>
      <Textwrapper>
        <Headline>ENTER RENTER DETAILS</Headline>
      </Textwrapper>
      <div className="container">
        <FormKit
          fields={formGrid}
          submitButton={submitBtnInfo}
          onSubmit={(event) => handleSubmit(event)}
          initialValue={initialState}
        />
      </div>
    </Card>
  )
}
