import api from '@/api'

export default {
  // Update route list. Fetches bare minimum(list of routes containing id, name, and areas served)
  UPDATE_ROUTE_LIST({ commit }) {
      return api.fetchRoutes().then((res) => {
        commit('UPDATE_ROUTE_LIST', res.data.data.routes)
      }).catch((err) => {
        commit('UPDATE_ROUTE_LIST', [])
      })
  },

  // Update stop list. Fetches bare minimum(list of stop containing id, name, and area served)
  UPDATE_STOP_LIST({ commit }) {
      return api.fetchStops().then((res) => {
        commit('UPDATE_STOP_LIST', res.data.data.stops)
      }).catch((err) => {
        commit('UPDATE_STOP_LIST', [])
      })
  },

  // Get all data on route. (i.e. served stops, arrival times, etc)
  RETRIEVE_ROUTE({ commit }, id) {
    return api.fetchRoute(id).then(res => commit('UPDATE_ROUTE', res.data.data.route))
  },

  // Get all data on route. (i.e. served stops, arrival times, etc)
  RETRIEVE_STOP({ commit }, id) {
    return api.fetchStop(id).then(res => commit('UPDATE_STOP', res.data.data.stop))
  }
}
