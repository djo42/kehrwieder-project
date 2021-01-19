var axios = require('axios')

require('dotenv').config()

module.exports = {
  apicall: async function apicall(url, login) {
    const feedback = await axios
      .get(url, {
        timeout: 120000,
        headers: {
          Authorization: login,
        },
      })
      .catch((err) => console.log(err))

    return feedback
  },
}
