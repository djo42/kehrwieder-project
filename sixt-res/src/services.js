//API access via backend

import axios from 'axios'

export async function getSixt(apiname, parameters) {
  const result = await axios
    .get(`${process.env.REACT_APP_SX_API}${apiname}${parameters}`)
    .catch((error) => console.log(error))

  
  return result
}




