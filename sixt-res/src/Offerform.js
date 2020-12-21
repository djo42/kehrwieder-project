import React from 'react'
import styled from 'styled-components'
import './App.css'

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
    serialize(formData)
    // ... submit to API or something
  }

  return (
    <Offerform>
      <Offerformlabel htmlFor="agencypp">
      Agency Prepaid:<Offerinput type="checkbox" id="agencypp" name="agencypp" />
        
      </Offerformlabel>
      <Offerformlabel htmlFor="cocity">
        <Offerinput
          id="cocity"
          name="uci"
          type="text"
          onChange={handleChange}
        />
        Pick-up branch
      </Offerformlabel>
      <Offerformlabel htmlFor="codat">
        <Offerinput id="codat" name="uda" type="date" onChange={handleChange} />
        Pick-up date
      </Offerformlabel>
      <Offerformlabel htmlFor="cotime">
        <Offerinput
          id="cotime"
          name="uti"
          type="time"
          onChange={handleChange}
        />
        Pick-up time
      </Offerformlabel>
      <Offerformlabel htmlFor="cicity">
        <Offerinput
          id="cicity"
          name="rci"
          type="text"
          onChange={handleChange}
        />
        Return branch
      </Offerformlabel>
      <Offerformlabel htmlFor="cidat">
        <Offerinput id="cidat" name="rda" type="date" onChange={handleChange} />
        Return date
      </Offerformlabel>
      <Offerformlabel htmlFor="citime">
        <Offerinput
          id="citime"
          name="rti"
          type="time"
          onChange={handleChange}
        />
        Return time
      </Offerformlabel>
      <button onClick={handleSubmit}>Send request</button>
    </Offerform>
  )
}

const Offerform = styled.form`
  box-sizing: border-box;
  display: inline-grid;
  width: 90%;
  font-size: 1em;
  font-family: Roboto;
  border: 1px solid;
  background: white;
  border-radius: 3px;
  border: lightgrey;
  border-size: 1px;
  box-shadow: 4px 4px 5px 2px rgba(0, 0, 255, 0.2);
  color: white;
  margin: 20px;
  padding: 1em 1em;
`

const Offerinput = styled.input`
    display: flex-box;
    font-size: 14px;
    display: block;
    color: purple;
    content: "Hello";
    top: 14px;
    right: 10px;
    width: 50%;
    height: 1.5rem;
    margin: 10px;
    border-bottom: 2px grey !important;
    }
    `

const Offerformlabel = styled.label`
  display: inline-block;
  font-size: 1em;
  color: purple;
  margin: 5px;
`
