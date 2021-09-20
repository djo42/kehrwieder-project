import axios from 'axios'
import '../App.css'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import {
  Typeahead,
  Menu,
  MenuItem,
  Highlighter,
  small,
} from 'react-bootstrap-typeahead'

export default function Offerdataform({ handleClick }) {
  const initialFormData = Object.freeze({
    api: 'AvailabilityRequest',
    uci: '',
    uti: '',
    uda: '',
    rci: '',
    rti: '',
    rda: '',
    kdnr: '',
  })

  const products = JSON.parse(process.env.REACT_APP_PRODUCTS)

  const [formData, updateFormData] = React.useState(initialFormData)
  const [branches, setBranches] = useState([])
  const [companies, setCompanies] = useState([])
  const [addProducts, setAddProducts] = useState(false)

  useEffect(() => {
    getTypeahead()
  }, [])

  const api = process.env.REACT_APP_BACKEND

  const basicauth = `Basic ${btoa(
    `${process.env.REACT_APP_AUTH_USR}:${process.env.REACT_APP_AUTH_PWD}`
  )}`

  console.log(api + ' ' + basicauth)

  function getTypeahead() {
    console.log('bis hier')
    const config = {
      headers: {
        Authorization: basicauth,
      },
    }

    const requestBranches = axios.get(api + '/db/cities', config)
    const requestCompanies = axios.get(api + '/db/companies', config)

    axios
      .all([requestBranches, requestCompanies])
      .then(
        axios.spread((...responses) => {
          setBranches(responses[0].data)
          setCompanies(responses[1].data)
        })
      )
      .catch((err) => console.log(err))
  }

  function serialize(obj) {
    console.log(typeof obj.kdnr)
    var req = {
      api: 'AvailabilityRequest',
      uda: obj.uda + 'T' + obj.uti,
      rda: obj.rda + 'T' + obj.rti,
      uci: `${obj.uci}`,
      rci: `${obj.rci}`,
      age: process.env.REACT_APP_SX_AGE1,
      kdnr: `${obj.kdnr}`,
      ctyp: 'P',
      wakz: 'KRW',
      posl: 'KR',
    }

    return handleClick(JSON.stringify(req))
  }

  const handleChange = (key, value) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace

      [key]: value,
    })
  }

  console.log(formData)

  const handleSubmit = (formData) => {
    //formData.preventDefault()
    console.log('handleSubmit: ' + formData)
    serialize(formData)
    //handleClick(formData)
    // ... submit to API or something
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Request Form</Card.Title>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group">
              <label class="lbl-form" htmlFor="uci">
                Check-out Branch
              </label>
              <Typeahead
                single
                clearButton
                id="uci"
                name="uci"
                onChange={(e) => {
                  if (e[0] === undefined || null) {
                  } else {
                    handleChange('uci', e[0].StationID)
                  }
                }}
                options={branches}
                labelKey={(option) => `${option.Name} (${option.Address})`}
                size="default"
                minLength="3"
                placeholder="Check-out branch"
                required={true}
              />
            </div>
            <div class="form-group">
              <label class="lbl-form" htmlFor="rci">
                Return Branch
              </label>
              <Typeahead
                single
                clearButton
                id="rci"
                name="rci"
                onChange={(e) => {
                  if (e[0] === undefined || null) {
                  } else {
                    handleChange('rci', e[0].StationID)
                  }
                }}
                options={branches}
                labelKey={(option) => `${option.Name} (${option.Address})`}
                size="default"
                minLength="3"
                placeholder="Return branch"
                required={true}
              />
            </div>
            <div class="form-row">
              <div class="form-group col">
                <label class="lbl-form" htmlFor="uda">
                  Check-out date
                </label>
                <input
                  class="form-control"
                  type="date"
                  label="Pick-up Date"
                  key="5"
                  id="uda"
                  name="uda"
                  onChange={(e) => {
                    e.preventDefault()
                    handleChange(e.target.name, e.target.value.trim())
                  }}
                  required={true}
                  placeholder="Check-out date"
                />
              </div>
              <div class="form-group col">
                <label class="lbl-form" htmlFor="uti">
                  Time
                </label>
                <input
                  class="form-control"
                  type="time"
                  label="Pick-up Time"
                  key="5"
                  id="uti"
                  name="uti"
                  onChange={(e) => {
                    e.preventDefault()
                    handleChange(e.target.name, e.target.value.trim())
                  }}
                  required={true}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col">
                <label class="lbl-form" htmlFor="uda">
                  Return date
                </label>
                <input
                  class="form-control"
                  type="date"
                  label="Return Date"
                  key="5"
                  id="rda"
                  name="rda"
                  onChange={(e) => {
                    e.preventDefault()
                    handleChange(e.target.name, e.target.value.trim())
                  }}
                  required={true}
                  placeholder="Return date"
                />
              </div>
              <div class="form-group col">
                <label class="lbl-form" htmlFor="rti">
                  Time
                </label>
                <input
                  class="form-control"
                  type="time"
                  label="Return Time"
                  key="5"
                  id="rti"
                  name="rti"
                  onChange={(e) => {
                    e.preventDefault()
                    handleChange(e.target.name, e.target.value.trim())
                  }}
                  required={true}
                />
              </div>
            </div>
            <label class="my-1 mr-2 lbl-form" for="inlineFormCustomSelectPref">
              Please choose your rate
            </label>
            <select
              class="custom-select my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              id="kdnr"
              name="kdnr"
              onChange={(e) => {
                if (e.target.value === 'other') {
                  setAddProducts(true)
                } else {
                  setAddProducts(false)
                  handleChange(e.target.name, parseInt(e.target.value))
                }
              }}
            >
              <option selected>Choose...</option>
              {products.map((product, index) => (
                <option
                  value={product.kdnr}
                  key={index}
                  id={product.Segment}
                  {...product}
                >
                  {product.Segment}
                </option>
              ))}
              <option value={'other'}>Other Corporate Rate</option>
            </select>
            <Typeahead
              single
              clearButton
              className={addProducts ? '' : 'hidden'}
              id="kdnr"
              name="kdnr"
              onChange={(e) => {
                if (e[0] === undefined || null) {
                } else {
                  handleChange('kdnr', parseInt(e[0].KDNR))
                }
              }}
              options={companies}
              labelKey={(option) => `${option.Name1}`}
              size="default"
              minLength="3"
              placeholder="Enter company name"
              required={false}
              renderMenu={(results, menuProps) => (
                <Menu {...menuProps}>
                  {results.map((result, index) => (
                    <MenuItem option={result} position={index}>
                      <Highlighter>{result.Name1}</Highlighter>
                      <br></br>
                      <small>
                        {result.Strasse}
                        <br></br>{result.PLZ} {result.Ort}
                      </small>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            />

            <div class="custom-control custom-checkbox my-1 mr-sm-2">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customControlInline"
              />
              <label
                class="custom-control-label lbl-form"
                for="customControlInline"
              >
                Remember my preference
              </label>
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
