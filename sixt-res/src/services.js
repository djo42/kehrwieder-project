//API access via backend

import axios from 'axios'

export async function getVehicles() {
    const res = await axios.get('http://localhost:4000/api/sixt/vehmodellist?cit=11')
    console.log('Services.js: ' + JSON.stringify(res))
    return res
}