import axios from 'axios'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Button} from '../components/Components.js'

export default function AvailabilityDetails() {
  let { avrw } = useParams()

  useEffect(() => {
    callSixt()
  })

  async function callSixt() {
    const result = await axios
      .get(
        `${
          process.env.REACT_APP_SX_API +
          process.env.REACT_APP_SX_AVAILABILITYDETAILS
        }?avrw=${avrw}`
      )
      .catch((error) => console.log(error))

    console.log(result)
  }

  async function callReservation(formData) {
      
    /* const result = await axios
      .get(
        `${
          process.env.REACT_APP_SX_API +
          process.env.REACT_APP_SX_RESERVATION
        }?avrw=${avrw}`
      )
      .catch((error) => console.log(error)) */

    console.log(formData)
  }



  return (
    <>
      <div></div>
      <form onSubmit={(event) => {event.preventDefault(); callReservation(event)}}>
        <input id="anr" name='anr'></input>
        <input id="nam2" name='nam2'></input>
        <input id="nam1" name='nam1'></input>
        <input id="emai" name='emai'></input>
        <Button>Rent!</Button>
      </form>
    </>
  )
}
