<template lang="pug">
section.search
  .filteredRoutes
    .filter-title(v-if="filteredRoutes.length > 0") Routes
    Route(
      v-for="route in filteredRoutes"
      :key="route.id"
      :route="route"
      )
  .filteredStops
    .filter-title(v-if="filteredStops.length > 0") Stops
    Stop(v-for="stop in filteredStops"
        :stop = "stop"
        :key = "stop.tag")
</template>

<script>
import Route from 'components/list-elements/Route'
import Stop from 'components/list-elements/Stop'
import { mapGetters } from 'vuex'
export default {
  name: 'TheSearchPage',
  props: {
    query: {
      type: String,
      required: true,
    }
  },
  computed: {
    filteredStops() {
      const keyword = this.query.toLowerCase()
      return this.stops.filter((stop) => {
        return stop.name.toLowerCase().indexOf(keyword) > -1
      })
    },
    filteredRoutes() {
      const keyword = this.query.toLowerCase()
      return this.routes.filter((route) => {
        return route.name.toLowerCase().indexOf(keyword) > -1
      })
    },
    ...mapGetters([
      'stops',
      'routes'
    ]),
  },
  components: { Stop, Route }
}
</script>

<style lang="sass" scoped>
.filter-title
  padding: 10px 20px
  font-weight: bold
</style>
