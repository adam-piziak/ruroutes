import api from '@/api'

export default {
  FETCH_ROUTES({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.fetchRoutes().then((routes) => {
        commit('SET_ROUTES', { routes })
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },

  FETCH_STOPS({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.fetchStops().then((stops) => {
        commit('SET_STOPS', { stops })
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
