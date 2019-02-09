<template lang="pug">
#stop_routes
  .route(v-for="route in activeStop.routes" @click="goToRoute(route.id)")
    .icon
    .name {{ route.name }}
    .campuses
      .campus(v-for="campus in route.campuses") {{ campus }}
    .times(v-if="route.arrivals")
      .label Arriving in
      .time(v-for="time in routeTimes(route)" :class="{'green': time < 5, 'red': time <= 1}") {{ time }} min
</template>

<script>
import EventBus from '@/event-bus.js';
export default {
  computed: {
    activeStop() {
      return this.$store.getters.stop(this.$route.params.id)
    },
    routes() {
      return this.activeStop.schedule.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return  1;
        return 0
      })
    }
  },
  methods: {
    goToRoute(tag) {
      this.$router.push(`/routes/${tag}`)
      EventBus.$emit('GO_TO_ROUTE', tag);
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
  }
}
</script>

<style lang="sass" scoped>
.route
  display: relative
  background: white
  padding: 20px 30px
  border-bottom: 1px solid #EEE
  z-index: 5
  transition: box-shadow .2s, padding .2s
  &:hover
    cursor: pointer
    opacity: .99
    box-shadow: 0 0px 12px rgba(#000000, 0.2)
    z-index: 20
    padding-left: 35px
.icon
  display: inline-block
  height: 22px
  width: 20px
  opacity: .7
  transition: margin .15s
  vertical-align: text-bottom
  background:
    image: url(~icons/nav_routes.svg)

.name
  display: inline-block
  margin-left: 20px
  font-size: 1.2rem
  font-weight: 600
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
</style>
