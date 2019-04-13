import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      meta: {
        mobile: false,
      },
      routes: [{'id': 13232, 'name': 'hey'}],
      stops: [],
    },
    actions,
    getters,
    mutations
  })
}
