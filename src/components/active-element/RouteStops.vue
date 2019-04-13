<template lang="pug">
#route_stops
  template(v-if="route.stops.length > 0")
    .stop(
          v-for="stop in route.stops"
          :class="{'inactive': !stop.arrivals}"
          @click="goToStop(stop.id)")
      .icon-block
        .icon
      .main
        .name {{ stop.name }}
        .campus {{ stop.campus }}
        .times(v-if="stop.arrivals")
          .label Arriving in
          .time(v-for="time in stopTimes(stop)" :class="{'green': time < 5, 'red': time <= 1}") {{ time }} min
  template(v-else)
    .loading-bar
    .loading-text loading...
</template>

<script>
import EventBus from '@/event-bus.js';
export default {
  computed: {
    route() {
      let route = this.$store.getters.route(this.$route.params.id)
      if (route == undefined) {
        return {
          'name': "",
          'areas': [],
          'stops': []
        }
      }

      if (route.stops == undefined || route.stops == null) {
        return {
          ...route,
          stops: []
        }
      }

      return route
    },
  },
  methods: {
    goToStop(tag) {
      this.$router.push(`/stops/${tag}`)
    },
    stopTimes(stop) {
      const timesInMinutes = [];
      const currentEpochTime = Date.now();
      stop.arrivals.forEach((el) => {
        if (timesInMinutes.length >= 3) return;
        const difference = el - currentEpochTime;
        if (difference > 0) {
          const minutes = Math.round(difference / 60000);
          timesInMinutes.push(minutes);
        }
      });
      return timesInMinutes;
    },
  }
}
</script>

<style lang="sass" scoped>


.stop
  display: flex
  position: relative
  background: white
  padding: 18px 20px
  border-bottom: 1px solid #E0E0E0
  z-index: 5
  transition: padding .1s, margin .2s

  &:hover
    cursor: pointer
    opacity: .99
    box-shadow: 0 0px 3px rgba(#000000, 0.2)
    z-index: 20
    padding-left: 25px
    margin-right: -5px

.main
  flex-grow: 1
  display: inline-block
  margin-left: 20px
  top: 0

.name
  transition: margin .15s
  display: inline-block
  font-weight: 500
  color: #444
  font-size: 1.1rem

.campus
  color: #777
  margin-top: 6px

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

.label
  display: inline-block
  margin-right: 6px
.times
  margin-left: 0px
  margin-top: 6px
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

.icon-block
  display: inline-block
.icon
  display: inline-block
  height: 22px
  width: 20px
  opacity: .6
  transition: margin .15s
  vertical-align: text-bottom
  background:
    image: url(~icons/nav_stops.svg)
    size: 120%
    repeat: no-repeat
    position: center

.inactive
  opacity: 0.5
  padding-bottom: 12px
</style>
