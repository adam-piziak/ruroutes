import axios from 'axios'

const SERVER_URL = 'https://api.scarletbus.com'

export default {
  fetchRoute(id) {
    return axios({
      url: SERVER_URL + '/graphql',
      method: 'post',
      timeout: 5000,
      data: {
        query: `
        {
          route(id: ${id}) {
            id
            name
            active
            areas
            segments
            stops {
              id
              location
              name
              area
              arrivals
            }
          }
        }
        `
      }
    })
  },
  fetchStop(id) {
    return axios({
      url: SERVER_URL + '/graphql',
      method: 'post',
      timeout: 5000,
      data: {
        query: `
        {
          stop(id: ${id}) {
            id
            location
            name
            area
            routes(active: true) {
              id
              name
              areas
              arrivals
            }
          }
        }
        `
      }
    })
  },
  fetchRoutes() {
      return axios({
        url: SERVER_URL + '/graphql',
        method: 'post',
        timeout: 5000,
        data: {
          query: `
          {
            routes {
              id
              name
              active
              areas
            }
          }
          `
        }
      })
  },

  fetchStops() {
    return axios({
      url: SERVER_URL + '/graphql',
      method: 'post',
      timeout: 5000,
      data: {
        query: `
        {
          stops(active: true) {
            id
            name
            area
          }
        }
        `
      }
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
  },

  fetchRouteVehicles(route_id) {
    return axios({
      url: SERVER_URL + '/graphql',
      method: 'post',
      timeout: 5000,
      data: {
        query: `
          {
            vehicles (id: ${route_id}) {
              id
              location
            }
          }
        `
      }
    })
  }
}
