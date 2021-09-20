import React from 'react'
import { Card } from 'react-bootstrap'
import FormKit from 'react-bootstrap-formkit'
import { Headline, Textwrapper } from './Components.js'
import axios from 'axios'

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
      avrw: avrw,
    }
    console.log(req)

    var str = []
    for (var p in req)
      if (req.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(req[p]))
      }

    const querystr = '?' + str.join('&')

    //console.log('reservation' + querystr)

    //handleClick('reservation', querystr)

    // var env = {
    //   agency: 5146049,
    //   AvailabilityRow:
    //     'A0J0914F11-ZcCD8hq3gYI5nR27MJ2uVo3quTz3zoOWi0NWPeH6XRdBYjo1pUSYwrGlqStv9d0n3_NBmJKzlcS2rzB3-H13B_lGHlm0ctWo3JYfU-7lja6d2ZwNS5kdnOUBCdvYnOqVZl0rsMr7tCnxz87cj_F7GxEPhasVGg_H3qc784zr0PUbBZJux5gpg30CmvwaGcidzB5Ls_Hp0hONr7ZGj2RtL1SyE2gxK5RMvBucL465qecK0AvqNza5SApb9fSZJvuxPxIm54MBN82SAypO0R57yYAxwkPLBFi1UpT-U2gaMcmtIiqXZ1gnymyD0OceBLsFdi9mMS1hx7IjlFp4qr33FQU95HxdYOLJcDF27_Uo8YZ569UspV9MDGtBiBEGS1CzYsamtqYYBByydNxoC8ZtiuTpBMrE3Bz43Dsmhtnw9jJno6yn4iUuUBGUboKXzAqFoyq4swyMgtXMbcjn3JYVJc3HkAYOxKu6CmaSFRm8Q6gNG-v5uiupxMQtdyVocozyGeUeVLArQfC2Vmg2L7CUQTtSrw7BzgbKWFzXIGuH7e7ZhKdyofKEP2e-R2lfsrf1MDM',
    //   flightNo: 'LH123',
    //   payment: '',
    //   reference: 'Kehrwieder',
    //   bookerEmail: 'dennis.john@gmail.com',
    //   bonusProgram: 'LH',
    //   bonusNo: '123456789',
    //   title: 1,
    //   driverSurname: 'Kasmeier',
    //   driverFirstName: 'Karsten',
    //   driverStreet: 'lorem ipsum street 33',
    //   driverBuilding: 'Tower A',
    //   driverZIP: '14067',
    //   driverCity: 'Test Town',
    //   driverCountryISO: 'KR',
    //   driverMobileCountryCode: '0082',
    //   driverMobileAreaCode: '10',
    //   driverMobileNumber: '1234567',
    //   driverEmail: 'test@test.com',
    //   chco: [
    //     { code: 'BS', count: '2' },
    //     { code: 'BF', count: '1' },
    //     { code: 'CS', count: '3' },
    //   ],
    // }

    var env = {
      reservationNumber: 9902324705,
      secCode: '022a94eba',
      uda: '2022-01-15T10:30:00',
      rda: '2022-01-18T10:30:00',
      reference: 'Testreservation',
      chco: [{ code: 'CS', count: 3 }],
    }
    console.log(JSON.stringify(env))
    //handleClick(env)

    const endpoint = process.env.REACT_APP_BACKEND + '/api/AvailabilityRequest'

    // const basicauth = `Basic ${base64.encode(
    //   `${process.env.SX_BASIC_USER}:${process.env.SX_BASIC_PASS}`
    // )}`

    const basicauth = btoa(
      process.env.REACT_APP_AUTH_USR + ':' + process.env.REACT_APP_AUTH_PWD
    )

    axios({
      method: 'post',
      url: endpoint,
      data: env,
      headers: {
        Accept: 'text/json,application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicauth}`,
        api: 'StationShortListRequest',
      },
    }).then((result) => {
      return console.log(result)
    })

    return env
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
        <Headline>Enter renter details</Headline>
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
