import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

export default function Autofillform() {
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

  return (
    <>
      <Card className="margin-padding-card">
        <form>
          <div class="form-group">
            <label for="uci">Check-out Branch</label>
            <Typeahead
              single
              clearButton
              id="uci"
              name="uci"
              onChange={(selected) => {
                if (selected[0] === undefined || null) {
                } else {
                  console.log(selected[0].StationID)
                }
                // Handle selections...
              }}
              options={branches}
              labelKey={(option) =>
                `${option.Name} (${option.Address.Country})`
              }
              size="default"
              minLength="3"
              placeholder="Check-out branch"
            />
          </div>
          <div class="form-group">
            <label for="rci">Return Branch</label>
            <Typeahead
              single
              clearButton
              id="rci"
              name="rci"
              onChange={(selected) => {
                if (selected[0] === undefined || null) {
                } else {
                  console.log(selected[0].StationID)
                }
                // Handle selections...
              }}
              options={branches}
              labelKey={(option) =>
                `${option.Name} (${option.Address.Country})`
              }
              size="default"
              minLength="3"
              placeholder="Return branch"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-">
              <label for="uda">Check-out date</label>
              <input
                class="form-control"
                type="date"
                label="Pick-up Date"
                key="5"
                id="uda"
                name="uda"
                /* onChange={handleChange} */
                required="true"
                placeholder="Check-out date"
              />
            </div>
            <div class="form-group col-">
              <label for="uti">Time</label>
              <input
                class="form-control"
                type="time"
                label="Pick-up Time"
                key="5"
                id="uti"
                name="uti"
                /* onChange={handleChange} */
                required="true"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-">
              <label for="uda">Return date</label>
              <input
                class="form-control"
                type="date"
                label="Return Date"
                key="5"
                id="rda"
                name="rda"
                /* onChange={handleChange} */
                required="true"
                placeholder="Return date"
              />
            </div>
            <div class="form-group col-">
              <label for="rti">Time</label>
              <input
                class="form-control"
                type="time"
                label="Return Time"
                key="5"
                id="rti"
                name="rti"
                /* onChange={handleChange} */
                required="true"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </Card>
    </>
  )
}
