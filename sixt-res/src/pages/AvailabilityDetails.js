import axios from 'axios'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

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

  return (
    <>
      <div>{avrw}</div>
      <form>
        <input id="name"></input>
        <input id="lastname"></input>
        <input id="email"></input>
        <button></button>
      </form>
    </>
  )
}
