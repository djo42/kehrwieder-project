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
    serialize(formData)
    // ... submit to API or something
  }

  return (
    <Offerform>

   <Offerinput type="checkbox" id="agencypp" name="agencypp" /><Offerformlabel htmlFor="agencypp">Agency Prepaid</Offerformlabel><Zeilenwechsel />
  

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
  width: 100%;
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
  label, input, select, textarea {
    display: block;
    float: left;
`


const Offerinput = styled.input`
    display: block;
    float: left;
    font-size: 14px;
    font-family: Roboto;
    display: block;
    color: purple;
    content: "Hello";
    top: 14px;
    right: 10px;
    width: 33%;
    height: 1.5rem;
    margin: 10px;
    border-bottom: 2px grey !important;
    }
    `

const Offerformlabel = styled.label`
  display: block;
  float: left;
  text-align:left;
  font-size: 1em;
  color: purple;
  margin: 5px;
`

const Zeilenwechsel = styled.br`
  clear: left;
`

/* <form>
<label for="name">Name</label><input type="text" name="name" /><br />
<label for="email">E-Mail</label><input type="text" name="email" /><br />
<label for="betreff">Betreff:</label><input type="text" name="betreff" /><br />
</form> */


/* form{
// width: xxxpx;
}
label, input, select, textarea {
display: block;
float: left;
}
label {
// width: xxxpx;
// text-align: right;
}
input, select, textarea {
// width: xxxpx;
}
form br {
clear: left;
} */