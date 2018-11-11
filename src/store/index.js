import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      mobile: false,
      routes: [],
      stops: [],
      routeList: [],
      activeStops: [],
      activeStop: {},
      searchQuery: '',
      resolvingRoute: false,
      mounted: false
    },
    actions,
    getters,
    mutations
  })
}
