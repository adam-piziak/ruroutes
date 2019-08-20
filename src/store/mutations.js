export default {
  // Updates route list. Doesn't override existing routes
  UPDATE_ROUTE_LIST: (state, lastest_routes) => {
    // Delete routes in state that aren't in lastest_routes
    let routes = state.routes.filter(route => lastest_routes.some(r => route.id == r.id))

    // Add routes that aren't in state
    for (let i = 0; i < lastest_routes.length; i++) {
      if (!routes.some(ru => lastest_routes[i].id == ru.id)) {
        routes.splice(routes, 0, lastest_routes[i])
      }
    }

    state.routes = routes
  },

  // Updates stope list. Doesn't override existing stop
  // (except if they don't exist in lastest_stops)
  UPDATE_STOP_LIST: (state, lastest_stops) => {
    if (lastest_stops.length === 0) return

    // Delete routes in state that aren't in lastest_routes
    let stops = state.stops.filter(stop => lastest_stops.some(s => stop.id == s.id))

    // Add routes that aren't in state
    for (let i = 0; i < lastest_stops.length; i++) {
      if (!stops.some(s=> lastest_stops[i].id == s.id)) {
        stops.splice(stops, 0, lastest_stops[i])
      }
    }

    state.stops = stops
  },

  UPDATE_ROUTE: (state, updated_route) => {
    for (let i = 0; i < state.routes.length; i++) {
      if (state.routes[i].id === updated_route.id) {
        state.routes.splice(i, 1, updated_route)
        break
      }
    }
  },

  UPDATE_STOP: (state, updated_stop) => {
    for (let i = 0; i < state.stops.length; i++) {
      if (state.stops[i].id === updated_stop.id) {
        state.stops.splice(i, 1, updated_stop)
        break
      }
    }
  },

  SET_STOPS: (state, stops ) => {
    state.stops = stops;
  },

  SET_MOBILE: (state, mobileState) => {
    state.meta.mobile = mobileState
  },
}
