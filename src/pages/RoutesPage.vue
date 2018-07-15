<template lang="pug">
section.routes
  GenericError(v-if="routes.length === 0") No Active Routes Found
  router-view
  Route(
    v-for="(route) in routes"
    :key="route.name"
    :route="route"
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
