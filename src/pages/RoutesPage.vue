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
import axios from 'axios'
import api from "@/api"
import { mapGetters } from 'vuex'
export default {
  name: 'RoutesPage',
  components: {
    Route, GenericError
  },
  computed: {
    routes() {
      return this.$store.getters.activeRoutes
    },
    inactiveRoutes() {
      return this.$store.getters.inactiveRoutes
    }
  },
  serverPrefetch () {
    return this.$store.dispatch('UPDATE_ROUTE_LIST')
  }
}
</script>

<style lang="sass" scoped>
.routes
  background: #F5F5F5
  overflow-y: auto
  overflow-x: hidden
  flex-grow: 0
  position: relative
  z-index: 1
  height: calc(100vh - 152px)

  &::-webkit-scrollbar
    width: 8px

  &::-webkit-scrollbar-thumb
    background: #AAA

  &::-webkit-scrollbar-track
    background: #DDD

.inactive-title
  padding: 10px 20px
</style>
