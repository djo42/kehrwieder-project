import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Reservationform from '../components/Reservationform.js'
import './AvailabilityDetails.css'



export default function AvailabilityDetails() {
  const [resno, setResno] = useState([])

  let { avrw } = useParams()

  useEffect(() => {
  }, [resno])

  async function callSixt(apiname, parameters) {
    const result = await axios
      .get(`${`${process.env.REACT_APP_SX_API}${apiname}${parameters}`}&zah=AI`)
      .catch((error) => console.log(error))

    //window.sessionStorage.setItem('offer', JSON.stringify(result))

    var resarray = JSON.parse(localStorage.getItem('sxres')) || []

    var newres = {'resnr': result.data.Result.Reservation.Number}

    resarray.push(newres)

    localStorage.setItem('sxres', JSON.stringify(resarray))
    console.log(JSON.parse(localStorage.getItem('sxres')))

    var display = resno

    var reservationnumber = {'resnr': result.data.Result.Reservation.Number}

    console.log(reservationnumber)

    display.push(reservationnumber)

    setResno(display)

    console.log(resno)

/*     localStorage.setItem('reservation', JSON.stringify(result))
    //window.sessionStorage.removeItem('offer')
    console.log(JSON.parse(localStorage.getItem('reservation')))
     */
  }

  return (
    <>
      {/* <div>{resno.map(e => e.resnr).join(', ')}</div> */}
      <Reservationform className="auto-width" handleClick={callSixt} avrw={avrw} />
    </>
  )
}
