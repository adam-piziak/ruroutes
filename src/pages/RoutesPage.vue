<template lang="pug">
section.routes
  GenericError(v-if="routeList.length === 0") No Active Routes Found
  router-view
  Route(
    v-for="(route) in routeList"
    :key="route.tag"
    :route="route"
    )
</template>

<script>
import Route from 'components/list-elements/Route'
import GenericError from 'components/errors/GenericError'
import { mapGetters } from 'vuex'
export default {
  asyncData ({ store, route }) {
    return store.dispatch('FETCH_ROUTE_LIST')
  },
  name: 'RoutesPage',
  components: {
    Route, GenericError
  },
  computed: {
    ...mapGetters([
      'routeList'
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
