<template lang="pug">
transition(name="slide_active")
  #active-route(@click="$router.push('/routes')")
    .header
      .name {{ activeRoute.name }}
    .stops
      .stop(v-for="stop in activeRoute.schedule")
        .stop-name {{ stop.stop_title}}
        .stop-times
          .time(v-for="time in stopTimes(stop)") {{ time }} min
</template>

<script>
export default {
  name: 'ActiveRoute',
  computed: {
    activeRoute() {
      return this.$store.getters.route(this.$route.params.id)
    }
  },
  methods: {
    stopTimes(stop) {
      const timesInMinutes = [];
      const currentEpochTime = Date.now();
      stop.times.forEach((el) => {
        const difference = el - currentEpochTime;
        if (difference > 0) {
          const minutes = Math.floor(difference / 60000);
          timesInMinutes.push(minutes);
        }
      });
      return timesInMinutes;
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  padding: 24px 24px
  color: white
  border-bottom: 1px solid #CCC
  background: #cf2d2d
  box-shadow: 0 0 4px rgba(#000000, 0.4)
  transition: .3s
  height: 100px

  .name
    font-size: 1.9rem
    padding: 8px 0
    font-family: 'Kollektif'
    line-height: 32px
    font-weight: bold

.stops
  transition: .3s ease .1s
  height: calc(100vh - 50px)
  overflow-y: auto

  &::-webkit-scrollbar
    width: 8px

  &::-webkit-scrollbar-thumb
    background: #AAA

  &::-webkit-scrollbar-track
    background: #DDD
.stop
  height: 50px
  line-height: 50px
  padding: 0 10px
  border-bottom: 1px solid #DDD

  .stop-name
    display: inline-block

  .stop-times
    display: inline-block
    float: right

    .time
      display: inline-block
      padding-left: 10px

  &:hover
    background: #EEE
    cursor: pointer
#active-route
  height: 100vh
  width: 100%
  position: absolute
  background: white
  font-family: 'Roboto'
  top: 0
  z-index: 400
  user-select: none

.slide_active-enter-active
  transition: .15s ease-out

  .header, .stops
    opacity: 0
    transform: translateY(10px)
.slide_active-leave-active
  transition: .1s ease-out

.slide_active-enter, .slide_active-leave-to
  transform: translateY(40px)
  opacity: 0
</style>
