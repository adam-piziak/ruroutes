import axios from 'axios'

const SERVER_URL = 'http://127.0.0.1:8000'

export default {
  fetchRoutes() {
    return new Promise((resolve, reject) => {
      axios({
        url: SERVER_URL + '/graphql',
        method: 'post',
        timeout: 5000,
        data: {
          query: `
            {
              routes(active: true) {
                id
                name
                segments
                stops {
                  id
                  location
                  name
                  arrivals
                }
              }
            }
          `
        }
      }).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  fetchStops() {
    const request = SERVER_URL + '/graphql'
    return new Promise((resolve, reject) => {
      axios({
        url: SERVER_URL + '/graphql',
        method: 'post',
        data: {
          query: `
            {
              stops(active: true) {
                id
                name
                location
                area
                routes(active: true) {
                  id
                  name
                  arrivals
                }
              }
            }
          `
        }
      }).then((res) => {
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
