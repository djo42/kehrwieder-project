import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Reservationform from '../components/Reservationform.js'

export default function AvailabilityDetails() {

    const [resno, setResno] = useState('0')


  let { avrw } = useParams()

  useEffect(() => {
    //callSixt()
  })

  async function callSixt(apiname, parameters) {
    const result = await axios
      .get(`${`${process.env.REACT_APP_SX_API}${apiname}${parameters}`}&zah=AI`)
      .catch((error) => console.log(error))

    //window.sessionStorage.setItem('offer', JSON.stringify(result))

    localStorage.setItem('reservation', JSON.stringify(result))
    //window.sessionStorage.removeItem('offer')
    console.log(localStorage)
    setResno(result.data.Result.Reservation.Number)

  }

  

  return (
    <>
      <div>{resno}</div>
        <Reservationform handleClick={callSixt} avrw={avrw}/>
    </>
  )
}
