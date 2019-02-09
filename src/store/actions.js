import api from '@/api'

export default {
  FETCH_ROUTES({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.fetchRoutes().then((res) => {
        commit('SET_ROUTES', res.data.routes)
        resolve()
      }).catch((err) => {
        resolve()
        reject(err)
      })
    })
  },

  FETCH_STOPS({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.fetchStops().then((res) => {
        commit('SET_STOPS', res.data.stops)
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },

  FETCH_ROUTE_LIST({ commit, state }) {
    return api.fetchRouteList().then((routes) => {
      commit('SET_ROUTE_LIST', routes)
    })
  }
}
