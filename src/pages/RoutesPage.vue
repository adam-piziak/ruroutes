<template lang="pug">
section.routes
  GenericError(v-if="routes.length === 0") No Active Routes Found
  Route(
    v-for="(route, index) in routes"
    :key="route.name"
    :routeInfo="route"
    :routeIndex="index"
    )
</template>

<script>
import Route from 'components/items/Route'
import GenericError from 'components/errors/GenericError'
import { mapGetters } from 'vuex'
export default {
  name: 'RoutesPage',
  components: {
    Route, GenericError
  },
  computed: {
    ...mapGetters([
      'routes'
    ])
  }
}
</script>

<style lang="sass" scoped>
.routes
  background: #F0F0F0
  height: calc(100vh - 94px)
</style>
