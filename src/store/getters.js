export default {
  routes: state => state.routes,
  stops: state => state.stops,
  activeStop: state => state.activeStop,
  mobile: state => state.mobile,
  routeList: state => state.routeList,
  stop: (state) => (id) => {
    return state.stops.find((el) => {
      return el.id == id
    })
  },
  route: (state) => (id) => {
    return state.routes.find((el) => {
      return el.id == id
    })
  },
  keywords: (state) => {
    return state.searchQuery.toLowerCase().trim()
  },
  filteredStops: (state) => {
    const query = state.searchQuery.toLowerCase().trim()
    if (query === "") {
      return state.stops
    }
    const keywords = query.split(' ')
    const byNameKeywords = []
    const byCampus = []

    const byWholeName = state.stops.filter((stop) => {
      stop.name.toLowerCase().indexOf(query) > -1
    })
    state.stops.forEach((stop) => {
      keywords.forEach((keyword) => {
        if (stop.name.toLowerCase().indexOf(keyword) > -1) {
          byNameKeywords.push(stop)
          return
        }
      })

    })

    return byWholeName
  }
}
