import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function AvailabilityDetails() {
  let { avrw } = useParams()

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

      return result
      }

      const test = callSixt()
      console.log(test)




  return (
      <>
      <div>{avrw}</div>

      </>
  )
}
