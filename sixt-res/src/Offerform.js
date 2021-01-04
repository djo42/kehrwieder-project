import React from 'react'
import './App.css'
import {
  Textwrapper,
  Card,
  Button,
  Headline,
  InputcontainerRow,
  InputcontainerColumn,
  BranchInput,
  DatetimeInput,
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

  var date1 = new Date()
  var date2 = new Date()
  var start = new Date(date1.setDate(date1.getDate() + 30)).toISOString().substr(0,10);
  var end = new Date(date2.setDate(date2.getDate() + 37)).toISOString().substr(0,10);
  

  console.log(date2)

  

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
      <InputcontainerRow>
        <Input type="checkbox" id="agencypp" name="agencypp" />
        <Label htmlFor="agencypp">Agency Prepaid</Label>
      </InputcontainerRow>
      <InputcontainerColumn>
        <InputcontainerColumn>
          <Label htmlFor="cocity">Pick-up branch</Label>
          <BranchInput
            id="cocity"
            name="uci"
            type="text"
            onChange={handleChange}
          />
        </InputcontainerColumn>
        <InputcontainerColumn>
          <Label htmlFor="cicity">Return branch</Label>
          <BranchInput
            id="cicity"
            name="rci"
            type="text"
            onChange={handleChange}
          />
        </InputcontainerColumn>
      </InputcontainerColumn>

      <InputcontainerRow>
        <InputcontainerColumn>
          <Label htmlFor="codat">Pick-up date</Label>
          <DatetimeInput id="codat" name="uda" type="date" onChange={handleChange}/>
        </InputcontainerColumn>
        <InputcontainerColumn>
          <Label htmlFor="cotime">Pick-up time</Label>
          <DatetimeInput id="cotime" name="uti" type="time" onChange={handleChange} />
        </InputcontainerColumn>
        </InputcontainerRow>
        <InputcontainerRow>
        <InputcontainerColumn>
          <Label htmlFor="cidat">Return date</Label>
          <DatetimeInput id="cidat" name="rda" type="date" onChange={handleChange} />
        </InputcontainerColumn>
        <InputcontainerColumn>
          <Label htmlFor="citime">Return time</Label>
          <DatetimeInput id="citime" name="rti" type="time" onChange={handleChange} />
        </InputcontainerColumn>
        </InputcontainerRow>

      <Button onClick={handleSubmit}>Send request</Button>
    </Card>
  )
}
