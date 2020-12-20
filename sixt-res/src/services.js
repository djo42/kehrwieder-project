//API access via backend



export async function getSixt(apiname, parameters) {
  const result = await axios
    .get(`${process.env.REACT_APP_SX_API}${apiname}${parameters}`)
    .catch((error) => console.log(error))

  
  return result
}




