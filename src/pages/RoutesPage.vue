<template lang="pug">
section.routes
  GenericError(v-if="routes.length === 0") No Active Routes Found
  router-view
  Route(
    v-for="route in routes"
    :key="route.id"
    :route="route"
    )
</template>

<script>
import Route from 'components/list-elements/Route'
import GenericError from 'components/errors/GenericError'
import api from "@/api"
import { mapGetters } from 'vuex'
export default {
  asyncData ({ store, route }) {
    return store.dispatch('FETCH_ROUTES')
  },
  name: 'RoutesPage',
  components: {
    Route, GenericError
  },
  computed: {
    ...mapGetters([
      'routes'
    ]),
  }
}
</script>

<style lang="sass" scoped>
.routes
  background: #F0F0F0
  overflow-y: auto
  flex-grow: 0

  &::-webkit-scrollbar
    width: 8px

  &::-webkit-scrollbar-thumb
    background: #AAA

  &::-webkit-scrollbar-track
    background: #DDD

</style>
