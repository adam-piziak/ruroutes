<template lang="pug">
transition(name="slide")
  #active_component
    .return(@click="returnHome")
      .icon
      .label Go back to {{ basePath }}
    .element-header
      RouteHeader(v-if="basePath === 'routes'" :scroll="scroll")
      StopHeader(v-else)
    transition(name="list" appear mode="out-in")
      .list(@scroll.passive="onScroll" ref="list")
        transition(name="slide"  mode="out-in")
          RouteStops(v-if="basePath === 'routes'")
          StopRoutes(v-else)
</template>

<script>
import RouteHeader from 'components/active-element/RouteHeader.vue'
import StopHeader from 'components/active-element/StopHeader.vue'
const StopRoutes = () => import('components/active-element/StopRoutes.vue')
const RouteStops = () => import('components/active-element/RouteStops.vue')


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
    basePath() {
      if (this.$route.path.indexOf('stops') !== -1) {
        return "stops"
      }
      return "routes"
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
.return
  position: relative
  z-index: 120
  background: white
  border-bottom: 1px solid #EEE
  padding: 10px 30px
  color: #333
  font-weight: 500
  transition: box-shadow .2s, border .5s, padding .2s

  .icon
    display: inline-block
    height: 22px
    width: 20px
    opacity: .8
    transition: .2s
    background:
      image: url(~icons/back.svg)
      position: center
      size: 100%
      repeat: no-repeat

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
  box-shadow: 0 2px 6px rgba(#000000, 0.2)
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

  &:hover
    cursor: pointer
    z-index: 200
    box-shadow: 0 2px 8px rgba(#000000, 0.3)

  &:active
    background: #EEE

.head
  padding: 12px 24px
.element-header
  min-height: 80px
  color: #FAFAFA
  flex-grow: 0
  flex-shrink: 0

.list
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
