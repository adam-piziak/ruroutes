<template lang="pug">
#stop_routes
  .routes(v-if="stop.routes.length > 0")
    transition-group(name="appear" appear)
      .route(v-for="route in stop.routes"
             :key="route.id"
             @click="goToRoute(route.id)")
        .icon
        .name {{ route.name }}
        .campuses
          .campus(v-for="campus in route.campuses") {{ campus }}
        .times(v-if="route.arrivals")
          .label Arriving in
          .time(v-for="time in routeTimes(route)" :class="{'green': time < 5, 'red': time <= 1}") {{ time }} min
  template(v-else)
    .loading-bar
    .loading-text loading...
</template>

<script>
import EventBus from '@/event-bus.js';
export default {
  data() {
    return {
      scheduler: null,
    }
  },
  computed: {
    stop() {
      let stop = this.$store.getters.stop(this.$route.params.id)
      if (stop == undefined) {
        return {
          'name': "",
          'areas': [],
          'routes': []
        }
      }

      if (stop.routes == undefined || stop.routes == null) {
        return {
          ...stop,
          routes: []
        }
      }

      return stop
    }
  },
  methods: {
    goToRoute(tag) {
      this.$emit('navigate')
      this.$router.push(`/routes/${tag}`)
    },
    routeTimes(route) {
      const timesInMinutes = [];
      const currentEpochTime = Date.now();
      route.arrivals.forEach((el) => {
        if (timesInMinutes.length >= 3) return;
        const difference = el - currentEpochTime;
        if (difference > 0) {
          const minutes = Math.round(difference / 60000);
          timesInMinutes.push(minutes);
        }
      });
      return timesInMinutes;
    }
  },
  serverPrefetch () {
    return this.$store.dispatch('UPDATE_STOP_LIST')
  },
  mounted() {
    let ctx = this
    this.scheduler = setInterval(() => {
      ctx.$store.dispatch('RETRIEVE_ROUTE', this.$route.params.id)
    }, 20000);
  },
  beforeDestroy() {
    clearInterval(this.scheduler)
  }
}
</script>

<style lang="sass" scoped>
.routes
  background: #F5F5F5

.route
  display: relative
  background: white
  padding: 20px 30px
  border-bottom: 1px solid #DADADA
  z-index: 5
  transition: box-shadow .2s, padding .2s
  &:hover
    cursor: pointer
    opacity: .99
    box-shadow: 0 0px 3px rgba(#000000, 0.2)
    z-index: 20
    padding-left: 35px
.icon
  display: inline-block
  height: 22px
  width: 20px
  opacity: .6
  transition: margin .15s
  vertical-align: text-top
  background:
    image: url(~icons/bus_outline.svg)

.loading-text
  padding: 20px
  color: #888
.loading-bar
  background: red
  height: 3px
  width: 40%
  opacity: .5
  animation: slide 1.4s ease-in-out infinite

@keyframes slide
  0%
    margin-left: -40%
    background: blue
    width: 20%
  30%
    background: green
  60%, 100%
    width: 60%
    margin-left: 100%
    background: red

.name
  display: inline-block
  margin-left: 20px
  font-size: 1.1rem
  font-weight: 500
  letter-spacing: 0.02rem
  color: #444

.campus
  display: inline-block

  &:not(:last-child)::after
    content: "·"
    margin: 0 6px
    font-weight: 900

.campuses
  margin-left: 40px
  margin-top: 8px
  color: #777
  text-transform: capitalize
.label
  display: inline-block
  margin-right: 6px
.times
  margin-left: 40px
  margin-top: 8px
  color: #444

.time
  font-weight: 500
  display: inline-block
  margin-right: 8px
  &:not(:last-child)::after
    content: ", "

  &.green
    color: #168625

  &.green.red
    color: #e64848

.appear-enter-active, .appear-leave-active
  transition: all .3s

.appear-enter, .appear-leave-to
  opacity: 0

</style>
