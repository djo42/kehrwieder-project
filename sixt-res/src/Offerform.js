import React from 'react'
import styled from 'styled-components'
import { getSixt } from './services.js'

export default function Offerdataform() {
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

    //console.log(querystr)

    getSixt('availability', querystr)
    //return console.log('?' + str.join('&'))
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
        <Offerinput type="checkbox" id="agencypp" name="agencypp" />
        Agency Prepaid
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
      <Offerformlabel for="codat">
        <Offerinput
          id="codat"
          name="uda"
          type="date"
          onChange={handleChange}
        />
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
        <Offerinput
          id="cidat"
          name="rda"
          type="date"
          onChange={handleChange}
        />
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
      <button onClick={handleSubmit}>start request</button>
    </Offerform>
  )
}

const Offerform = styled.form`
    box-sizing: border-box;
    display: inline-grid;
    float: left;
    width: 100%;
    font-size: 12px;
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
    color: hotpink;
    content: "Hello";
    top: 14px;
    right: 10px;
    width: 50%;
    height: 2rem;
    margin: 10px;
    border-bottom: 2px grey !important;
    }
    `

const Offerformlabel = styled.label`
    font-size: 1em;
    color: hotpink;
    margin: 5px;
    `

const Select = styled.select`
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 35px;
    background: white;
    color: gray;
    padding-left: 5px;
    font-size: 14px;
    border: none;
    margin: 10px 0 0 0;

        option {
        color: black;
        background: white;
        font-weight: small;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
        }
    `
