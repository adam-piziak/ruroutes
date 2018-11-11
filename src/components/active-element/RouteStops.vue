<template lang="pug">
#route_stops()
  .stop(v-for="stop in activeRoute.schedule" @click="goToStop(stop.stop_tag)")
    .icon
    .main
      .name {{ stop.stop_title }}
      .campus {{ stop.campus }}
      .times
        .label Arriving in
        .time(v-for="time in stopTimes(stop)" :class="{'green': time < 5, 'red': time <= 1}") {{ time }} min
</template>

<script>
import EventBus from '@/event-bus.js';
export default {
  computed: {
    activeRoute() {
      return this.$store.getters.route(this.$route.params.id)
    },
    stops() {
      return this.activeRoute.schedule.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return  1;
        return 0
      })
    }
  },
  methods: {
    goToStop(tag) {
      this.$router.push(`/stops/${tag}`)
    //  EventBus.$emit('GO_TO_STOP', tag);
    },
    stopTimes(stop) {
      const timesInMinutes = [];
      const currentEpochTime = Date.now();
      stop.times.forEach((el) => {
        if (timesInMinutes.length >= 3) return;
        const difference = el - currentEpochTime;
        if (difference > 0) {
          const minutes = Math.round(difference / 60000);
          timesInMinutes.push(minutes);
        }
      });
      return timesInMinutes;
    },
    onScroll() {
      console.log("hello")
    }
  }
}
</script>

<style lang="sass" scoped>


.stop
  background: white
  padding: 18px 30px
  border-bottom: 1px solid #E0E0E0
  z-index: 5
  transition: padding .2s, margin .2s

  &:hover
    cursor: pointer
    opacity: .99
    box-shadow: 0 0px 8px rgba(#000000, 0.2)
    z-index: 20
    padding-left: 35px
    margin-right: -5px

.main
  flex-grow: 1
  display: inline-block
  margin-left: 16px
.icon
  display: inline-block
  height: 22px
  width: 20px
  opacity: .7
  transition: margin .15s
  float: left
  vertical-align: text-bottom
  background:
    image: url(~icons/nav_routes.svg)

.name
  transition: margin .15s
  display: inline-block
  font-weight: 500
  color: #444
  font-size: 1.1rem

.campus
  color: #777
  margin-top: 6px


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
</style>
