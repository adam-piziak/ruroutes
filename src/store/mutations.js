export default {
  SET_ROUTES: (state, { routes }) => {
    state.routes = routes;
  },

  SET_STOPS: (state, { stops }) => {
    state.stops = stops;
  },

  SET_ACTIVE_STOP: (state, stop) => {
    state.activeStop = stop;
  },

  CLEAR_ACTIVE_STOP: (state) => {
    state.activeStop = {}
  },

  SET_MOBILE: (state, mobileState) => {
    state.mobile = mobileState
  },

  SET_SEARCH_QUERY: (state, query) => {
    state.searchQuery = query
  }

}
