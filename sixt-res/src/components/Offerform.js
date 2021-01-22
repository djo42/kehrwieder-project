import axios from 'axios'
import '../App.css'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

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
  const [branches, setBranches] = useState([])

  useEffect(() => {
    getBranches()
  }, [])

  async function getBranches() {
    const result = await axios
      .get(process.env.REACT_APP_BACKEND + '/db')
      .catch((error) => console.log(error))

    console.log(result.data)

    setBranches(result.data)
  }

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
    console.log('serialize: ' + req)

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
    console.log({ [event.target.name]: event.target.value.trim() })
    updateFormData({
      ...formData,

      // Trimming any whitespace

      [event.target.name]: event.target.value.trim(),
    })
  }

  const handleBranchChange = (event, param) => {
    console.log(param)
    console.log({ [param]: event[0].StationID })
    updateFormData({
      ...formData,

      // Trimming any whitespace

      [param]: event[0].StationID,
    })
  }

  console.log(formData)

  const handleSubmit = (formData) => {
    //formData.preventDefault()
    console.log('handleSubmit: ' + formData)
    serialize(formData)
    // ... submit to API or something
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Request Form</Card.Title>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group">
              <label htmlFor="uci">Check-out Branch</label>
              <Typeahead
                single
                clearButton
                id="uci"
                name="uci"
                onChange={(e) => {
                  if (e[0] === undefined || null) {
                  } else {
                    const f = 'uci'
                    handleBranchChange(e, f)
                  }
                }}
                options={branches}
                labelKey={(option) =>
                  `${option.Name} (${option.Address.Country})`
                }
                size="default"
                minLength="3"
                placeholder="Check-out branch"
                required={true}
              />
            </div>
            <div class="form-group">
              <label htmlFor="rci">Return Branch</label>
              <Typeahead
                single
                clearButton
                id="rci"
                name="rci"
                onChange={(e) => {
                  if (e[0] === undefined || null) {
                  } else {
                    const f = 'rci'
                    handleBranchChange(e, f)
                  }
                }}
                options={branches}
                labelKey={(option) =>
                  `${option.Name} (${option.Address.Country})`
                }
                size="default"
                minLength="3"
                placeholder="Return branch"
                required={true}
              />
            </div>
            <div class="form-row">
              <div class="form-group col">
                <label htmlFor="uda">Check-out date</label>
                <input
                  class="form-control"
                  type="date"
                  label="Pick-up Date"
                  key="5"
                  id="uda"
                  name="uda"
                  onChange={handleChange}
                  required={true}
                  placeholder="Check-out date"
                />
              </div>
              <div class="form-group col">
                <label htmlFor="uti">Time</label>
                <input
                  class="form-control"
                  type="time"
                  label="Pick-up Time"
                  key="5"
                  id="uti"
                  name="uti"
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col">
                <label htmlFor="uda">Return date</label>
                <input
                  class="form-control"
                  type="date"
                  label="Return Date"
                  key="5"
                  id="rda"
                  name="rda"
                  onChange={handleChange}
                  required={true}
                  placeholder="Return date"
                />
              </div>
              <div class="form-group col">
                <label htmlFor="rti">Time</label>
                <input
                  class="form-control"
                  type="time"
                  label="Return Time"
                  key="5"
                  id="rti"
                  name="rti"
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
            <button
              type="button"
              class="btn btn-success"
              onClick={(e) => {
                e.preventDefault()
                console.log(e)
                handleSubmit(formData)
              }}
            >
              Submit
            </button>
          </form>
        </Card.Body>
      </Card>
    </>
  )
}
