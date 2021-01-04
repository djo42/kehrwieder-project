import React from 'react'
import './App.css'
import {
  Textwrapper,
  Card,
  Button,
  Headline,
  Inputcontainer,
  BranchInput,
  Input,
  Label,
} from './components/Components'

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

  function serialize(obj) {
    var req = {
      udt: obj.uda + 'T' + obj.uti,
      rdt: obj.rda + 'T' + obj.rti,
      uci: obj.uci,
      rci: obj.rci,
      age: process.env.REACT_APP_SX_AGE1,
      kdnr: process.env.REACT_APP_SX_KDNR3,
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

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    serialize(formData)
    // ... submit to API or something
  }

  return (
    <Card>
      <Textwrapper>
        <Headline>RENTAL DETAILS</Headline>
      </Textwrapper>
      <Inputcontainer>
        <Input type="checkbox" id="agencypp" name="agencypp" />
        <Label htmlFor="agencypp">Agency Prepaid</Label>
      </Inputcontainer>
      <Inputcontainer>
        <Label htmlFor="cocity">Pick-up branch</Label>
        <BranchInput
          id="cocity"
          name="uci"
          type="text"
          onChange={handleChange}
        />
      </Inputcontainer>
      <Inputcontainer>
        <Label htmlFor="cicity">Return branch</Label>
        <BranchInput
          id="cicity"
          name="rci"
          type="text"
          onChange={handleChange}
        />
      </Inputcontainer>

      <Inputcontainer>
        <Inputcontainer>
          <Label htmlFor="codat">Pick-up date</Label>
          <Input id="codat" name="uda" type="date" onChange={handleChange} />
        </Inputcontainer>
        <Inputcontainer>
          <Label htmlFor="cotime">Pick-up time</Label>
          <Input id="cotime" name="uti" type="time" onChange={handleChange} />
        </Inputcontainer>
      </Inputcontainer>
      <Inputcontainer>
        <Inputcontainer>
          <Label htmlFor="cidat">Return date</Label>
          <Input id="cidat" name="rda" type="date" onChange={handleChange} />
        </Inputcontainer>
        <Inputcontainer>
          <Label htmlFor="citime">Return time</Label>
          <Input id="citime" name="rti" type="time" onChange={handleChange} />
        </Inputcontainer>
      </Inputcontainer>

      <Button onClick={handleSubmit}>Send request</Button>
    </Card>
  )
}
