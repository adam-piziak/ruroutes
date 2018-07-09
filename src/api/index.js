import axios from 'axios'

const SERVER_URL = 'https://api.ruroutes.com'

export default {
  fetchRoutes() {
    const request = SERVER_URL + '/predictions'
    return new Promise((resolve, reject) => {
      axios.get(request).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  fetchStops() {
    const request = SERVER_URL + '/stops'
    return new Promise((resolve, reject) => {
      axios.get(request).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
