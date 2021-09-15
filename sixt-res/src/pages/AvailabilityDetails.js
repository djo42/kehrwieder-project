import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Reservationform from '../components/Reservationform.js'
import './AvailabilityDetails.css'

export default function AvailabilityDetails() {
  const [resno, setResno] = useState([])

  let { avrw } = useParams()

console.log({avrw})

  useEffect(() => {}, [resno])

    const endpoint = process.env.REACT_APP_BACKEND + '/api/AvailabilityRequest'

    // const basicauth = `Basic ${base64.encode(
    //   `${process.env.SX_BASIC_USER}:${process.env.SX_BASIC_PASS}`
    // )}`

    const basicauth = btoa(
      process.env.REACT_APP_AUTH_USR + ':' + process.env.REACT_APP_AUTH_PWD
    )

  async function callSixt() {
    const result = new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: endpoint,
        data: {avrw},
        headers: {
          Accept: 'text/json,application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${basicauth}`,
          api: 'ReservationRequest',
        },
      })
        .then((result) => {
          return result.data.result.data.ReservationResponse
        })
        .then((result) => {
          var resarray = JSON.parse(localStorage.getItem('sxres')) || []

          var newres = {
            resnr: result.Result.Reservation.Number,
          }

          resarray.push(newres)

          localStorage.setItem('sxres', JSON.stringify(resarray))
          console.log(JSON.parse(localStorage.getItem('sxres')))

          var display = resno

          var reservationnumber = {
            resnr: result.data.Result.Reservation.Number,
          }

          console.log(reservationnumber)

          display.push(reservationnumber)

          setResno(display)

          console.log(resno)

          return resolve()
        })
        .catch((err) => {
          return reject(err)
        })
    })

    return result
  }

  // async function callSixt(apiname, parameters) {
  //   const result = await axios
  //     .get(`${`${process.env.REACT_APP_SX_API}${apiname}${parameters}`}&zah=AI`)
  //     .catch((error) => console.log(error))

  //   //window.sessionStorage.setItem('offer', JSON.stringify(result))

  //   var resarray = JSON.parse(localStorage.getItem('sxres')) || []

  //   var newres = { resnr: result.data.Result.Reservation.Number }

  //   resarray.push(newres)

  //   localStorage.setItem('sxres', JSON.stringify(resarray))
  //   console.log(JSON.parse(localStorage.getItem('sxres')))

  //   var display = resno

  //   var reservationnumber = { resnr: result.data.Result.Reservation.Number }

  //   console.log(reservationnumber)

  //   display.push(reservationnumber)

  //   setResno(display)

  //   console.log(resno)

  //   /*     localStorage.setItem('reservation', JSON.stringify(result))
  //   //window.sessionStorage.removeItem('offer')
  //   console.log(JSON.parse(localStorage.getItem('reservation')))
  //    */
  // }

  return (
    <>
      {/* <div>{resno.map(e => e.resnr).join(', ')}</div> */}
      <Reservationform
        className="auto-width"
        handleClick={callSixt}
        avrw={avrw}
      />
    </>
  )
}
