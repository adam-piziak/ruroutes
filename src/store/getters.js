export default {
  // Return all the active routes
  routes: state => state.routes.sort((a, b) => a.name.localeCompare(b.name)),

  // Return all the stops in alphabetically order
  stops: state => state.stops.sort((a, b) => a.name.localeCompare(b.name)),

  // Returns the app metadata (i.e. mobile status)
  meta: state => state.meta,

  // Get a stop by its id
  stop: (state) => (id) => {
    return state.stops.find(s => s.id == id)
  },

  // Get a route by its id
  route: (state) => (id) => state.routes.find((r) => r.id == id),

  activeRoutes: (state) => {
    return state.routes.filter((route) => route.active)
                       .sort((a, b) => a.name.localeCompare(b.name))
  },
  inactiveRoutes: (state) => state.routes.filter((route) => !route.active)
}
