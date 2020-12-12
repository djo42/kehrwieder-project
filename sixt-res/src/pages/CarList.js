import React, {useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import {getVehicles} from '../services.js'

export default async function CarList() {
  
 const data = await getVehicles()

 console.log(data.result)
    
  return(
    <>

      {data.map((car) => (
        <div key={data.Group} {...car}>
          <img src={data.ImageUrl} alt={""} />
        </div>
      ))}

    </>
  )
}