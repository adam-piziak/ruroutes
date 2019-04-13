<template lang="pug">
#active_component
  .element-header
    .close-divider
    .close(@click="returnHome")
    template(v-if="basePath == 'routes'")
      .name {{ route.name }}
      .campuses
        .campus(v-for="campus in route.areas") {{ campus }}
    template(v-else)
      .name {{ stop.name }}
      .campuses
        .campus {{ stop.area }}
  .list(@scroll.passive="onScroll" ref="list")
    RouteStops(v-if="basePath === 'routes'")
    StopRoutes(v-else)
</template>

<script>
import RouteHeader from 'components/active-element/RouteHeader.vue'
import StopHeader from 'components/active-element/StopHeader.vue'
const StopRoutes = () => import('components/active-element/StopRoutes.vue')
const RouteStops = () => import('components/active-element/RouteStops.vue')

const STOPS = "stops"
const ROUTES = "routes"
export default {
  data() {
    return {
      scroll: 0
    }
  },
  components: {
    RouteHeader,
    RouteStops,
    StopHeader,
    StopRoutes
  },
  computed: {
    route() {
      let route = this.$store.getters.route(this.id)
      if (!route) {
        return {
          'name': "",
          'areas': []
        }
      }
      return route
    },
    stop() {
      let stop = this.$store.getters.stop(this.id)
      if (!stop) {
        return {
          'name': "",
          'area': ""
        }
      }
      return stop
    },
    basePath() {
      if (this.$route.path.indexOf('stops') !== -1) {
        return STOPS
      }
      return ROUTES
    },
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    returnHome() {
      this.$router.push('/' + this.basePath)
    },
    onScroll(e) {
      this.scroll = this.$refs.list.scrollTop
    }
  }
}
</script>
<style lang="sass" scoped>
@import "styles/colors.sass"
#active_component
  display: flex
  flex-direction: column
  position: absolute
  z-index: 100
  top: 0
  left: 0
  height: 100vh
  width: 100%
  background: white
  box-shadow: 0 0 8px rgba(#000000, 0.4)

  .label
    display: inline-block
    height: 24px
    vertical-align: bottom
    margin-left: 10px

  &:hover
    border-bottom: 1px solid #FEFEFE
    cursor: pointer
    box-shadow: 0 2px 8px rgba(#000000, 0.16)

#return
  position: relative
  z-index: 110
  background: white
  color: #e63e3e
  float: right
  padding: 8px 16px
  margin-left: 20px
  margin-right: 20px
  border-radius: 50px
  font-weight: 500
  transform: translateY(-50%)
  font-size: 1rem
  transition: transform .15s, box-shadow .15s, background .08s, color .08s

.head
  padding: 12px 24px
.element-header
  position: relative
  z-index: 100
  min-height: 80px
  background: white
  flex-grow: 0
  flex-shrink: 0
  box-shadow: 0 1px 3px rgba(#000000, 0.2)

  &:hover
    cursor: default

  .name
    line-height: 35px
    width: calc(100% - 90px)
    margin: 20px
    font-size: 1.5rem
    font-weight: 600

    &:hover
      cursor: text

.close
  height: 40px
  width: 40px
  background:
    image: url(~icons/close.svg)
    size: 90%
    position: center
  position: absolute
  right: 20px
  top: 20px
  border-radius: 10px

  &:hover
    cursor: pointer
    background-color: #EEE

    &:active
      background-color: #AAA

.close-divider
  position: absolute
  height: 44px
  width: 1px
  background: gray
  right: 70px
  top: 16px
  opacity: 0.3

.campuses
  margin: 20px 20px

  &:hover
    cursor: text

.campus
  display: inline-block
  font-size: 1rem
  color: #888



  &:not(:last-child)
    margin-right: 16px



.list
  background: relative
  background: white
  overflow-y: auto
  overflow-x: hidden
  flex-grow: 1
  &::-webkit-scrollbar
    width: 8px

  &::-webkit-scrollbar-thumb
    background: #AAA

  &::-webkit-scrollbar-track
    background: #DDD
.home-bar
  height: 40px
  background: #d32f2f

  &:hover
    cursor: pointer

  .icon
    display: inline-block
    height: 40px
    width: 40px
    margin-left: 24px
    background:
      image: url(~icons/back.svg)
      repeat: no-repeat
      position: left
      size: 55%

  .text
    display: inline-block
    line-height: 40px
    vertical-align: top
    font-weight: 500
    margin-left: -10px


.title
  font:
    weight: 500
    size: 1.6rem
  min-height: 32px
.campus
  font-size: 1.2rem

.slide-enter-active, .slide-leave-active
  transition: .15s ease-out

.slide-enter, .slide-leave-to
  transform: translateY(20px)
  opacity: 0

.header-enter-active, .header-leave-active
  transition: .3s ease-out .03s

.header-enter, .header-leave-to
  transform: translateY(20px)
  opacity: 0

.list-enter-active, .list-leave-active
  transition: .2s ease-out .12s

.list-enter, .list-leave-to
  transform: translateY(20px)
  opacity: 0
</style>
