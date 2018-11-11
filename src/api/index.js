import axios from 'axios'

const SERVER_URL = 'http://127.0.0.1:8243/'

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
  },

  fetchRouteList() {
    const request = SERVER_URL + "/routes"
    return new Promise((resolve, reject) => {
      axios.get(request)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => reject(err))
    })
   }
}
