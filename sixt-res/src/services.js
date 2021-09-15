//API access via backend
import axios from 'axios'

export default async function getSixt(apiname, parameters) {
  const result = await axios
    .get(`${process.env.REACT_APP_SX_API}${apiname}${parameters}`)
    .catch((error) => console.log(error))

    console.log(result)

  return result
}
