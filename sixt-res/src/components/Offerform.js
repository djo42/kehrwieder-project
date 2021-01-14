import React from 'react'
import {
  Formcontainer,
  Headlinewrapper,
  Textwrapper,
  Headline,
} from './Components.js'
import { Button, Card } from 'react-bootstrap'
import FormKit from 'react-bootstrap-formkit'

export default function Offerdataform({ handleClick }) {
  const initialFormData = Object.freeze({
    uci: '',
    uti: '',
    uda: '',
    rci: '',
    rti: '',
    rda: '',
  })

  const [formData, updateFormData] = React.useState(initialFormData)

  var date1 = new Date()
  var date2 = new Date()
  var start = new Date(date1.setDate(date1.getDate() + 30))
    .toISOString()
    .substr(0, 10)
  var end = new Date(date2.setDate(date2.getDate() + 37))
    .toISOString()
    .substr(0, 10)

  function serialize(obj) {
    var req = {
      udt: obj.uda + 'T' + obj.uti,
      rdt: obj.rda + 'T' + obj.rti,
      uci: obj.uci,
      rci: obj.rci,
      age: process.env.REACT_APP_SX_AGE1,
      kdnr: process.env.REACT_APP_SX_KDNR1,
      ctyp: 'P',
      wakz: 'KRW',
      posl: 'GB',
    }
    console.log(req)

    var str = []
    for (var p in req)
      if (req.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(req[p]))
      }

    const querystr = '?' + str.join('&')

    console.log('availability' + querystr)

    handleClick('availability', querystr)
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
        type: 'select',
        label: 'Pick-up Branch',
        key: '2',
        id: 'uci',
        onChange: { handleChange },
        name: 'uci',
      },
    ],
    [
      {
        type: 'select',
        label: 'Return Branch',
        key: '4',
        id: 'rci',
        onChange: { handleChange },
        name: 'rci',
      },
    ],
    [
      {
        type: 'date',
        label: 'Pick-up Date',
        key: '5',
        id: 'uda',
        name: 'uda',
        onChange: { handleChange },
        required: true,
      },
      {
        type: 'time',
        label: 'Time',
        key: '6',
        id: 'uti',
        name: 'uti',
        onChange: { handleChange },
        required: true,
      },
    ],
    [
      {
        type: 'date',
        label: 'Return Date',
        key: '7',
        id: 'rda',
        name: 'rda',
        onChange: { handleChange },
        required: true,
      },
      {
        type: 'time',
        label: 'Return Time',
        key: '8',
        id: 'rti',
        name: 'rti',
        onChange: { handleChange },
        required: true,
      },
    ],
  ]

  let submitBtnInfo = {
    name: 'Submit',
    className: 'btn btn-outline-primary btn-md float-right',
  }

  let initialState = {
    uda: start,
    rda: end,
    uti: '13:00',
    rti: '13:00',
    uci: '11',
    rci: '11',
    country1: 'Germany',
    country2: 'Germany',
  }

  return (
    <Card>
      <Headlinewrapper>
        <Textwrapper>
          <Headline>RENTAL DETAILS</Headline>
        </Textwrapper>
      </Headlinewrapper>
      <Formcontainer>
        <div className="container">
          <FormKit
            fields={formGrid}
            submitButton={submitBtnInfo}
            onSubmit={(event) => handleSubmit(event)}
            initialValue={initialState}
          />
        </div>
      </Formcontainer>
    </Card>
  )
}
