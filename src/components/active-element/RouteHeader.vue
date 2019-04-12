<template lang="pug">
.route-header(:class="{'elevate': scrolled }" v-if="activeRoute.loading != true")
  .route_title {{ activeRoute.name }}
  .route_campus(v-for="campus in activeRoute.areas") {{ campus }}
.loading-header(v-else)
</template>

<script>
export default {
  computed: {
    activeRoute() {
      let route = this.$store.getters.route(this.$route.params.id)
      if (route == undefined) {
        this.$store.dispatch('FETCH_ROUTES')
        this.$store.dispatch('FETCH_STOPS')
        return {
          loading: true
        }
      }
      return route
    },
    scrolled() {
      return this.scroll > 15
    }
  },
  props: {
    scroll: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.route-header
  position: relative
  background: white
  padding: 24px 30px
  color: #222
  transition: box-shadow .2s
  z-index: 100
  border-bottom: 1px solid #EEE


  &:hover
    cursor: default

  &.elevate
    box-shadow: 0 2px 6px rgba(#000000, 0.18)
    border-bottom: 0


  .route_title
    color: #202020
    font-size: 2rem
    font-weight: bold

.route_campus
  display: inline-block
  font-weight: 400
  text-transform: capitalize
  font-size: 1.1rem
  color: #777
  border-radius: 20px
  font-weight: 500
  margin-top: 12px


  &:not(:last-child)::after
    content: "·"
    margin: 0 8px
    font-weight: 900

.campuses
  color: #555

.loading-header
  padding: 24px 30px
  background: red
  </style>
