<template lang="pug">
transition(name="slide_active" mode="in-out")
  #active-route(:class="{'mobile': mobile}")
    .header(@click="$router.push('/routes')")
      .name {{ activeRoute.name }}
    .stops
      transition-group(
            appear
            name="staggered-enter"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave")
        .stop(v-for="(stop, index) in activeRoute.schedule"
              @click="$router.push('/stops/' + stop.stop_tag)"
              :class="{'inactive': stop.arrivals.length == null }"
              :key="stop.id"
              :data-index="index"
              )
          .bus-icon
          .right-container
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
    },
    mobile() {
      return this.$store.state.mobile
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
    },
    beforeEnter(el) {
      el.style.transition = '.4s';
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
    },
    enter(el, _done) {
      const delay = el.dataset.index * 30 + 50;
      const stop = el;
      setTimeout(() => {
        stop.style.opacity = 1;
        stop.style.transform = 'translateY(0)';
      }, delay);
      setTimeout(function () {
        stop.style = null
      }, delay + 400);
    },
    leave(el, _done) {
      const delay = el.dataset.index * 1500;
      const stop = el;
      setTimeout(() => {
        stop.style.opacity = 1;
      }, delay);
    },
  }
}
</script>

<style lang="sass" scoped>
@import "styles/colors.sass"

$side-padding: 24px
.header
  padding: $side-padding
  color: white
  background: $primary
  box-shadow: 0 0 4px rgba(#000000, 0.4)
  height: 100px

  .name
    font-size: 1.9rem
    padding: 8px 0
    font-family: 'Kollektif'
    line-height: 32px
    font-weight: bold

.stops
  height: calc(100vh - 50px)
  overflow-y: auto

  &::-webkit-scrollbar
    width: 8px

  &::-webkit-scrollbar-thumb
    background: #AAA

  &::-webkit-scrollbar-track
    background: #DDD
.stop
  padding: 0 10px
  border-bottom: 1px solid #EEE
  padding: 12px $side-padding

  .stop-name
    font-size: 1.1rem
    font-weight: 500
    color: #333
    margin-top: 4px
    display: inline-block

  .stop-times
    margin-top: 8px
    color: $primary

    .time
      display: inline-block

      &:not(:last-child)
        padding-right: 10px

  &:hover
    background: #EEE
    cursor: pointer

.bus-icon
  height: 100%
  width: 100px
  background:
    color: red
    image: url('../../assets/icons/nav_routes.svg')
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

.slide_active-leave-active
  transition: .1s ease-out

.slide_active-enter, .slide_active-leave-to
  transform: translateY(40px)
  opacity: 0

.inactive
  background: pink
</style>
