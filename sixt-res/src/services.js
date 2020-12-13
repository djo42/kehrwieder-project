//API access via backend

import axios from 'axios'

export async function getVehicles() {
  const result = await axios.get(
    'http://localhost:4000/api/sixt/vehmodellist?cit=11'
  )
  return result
}
