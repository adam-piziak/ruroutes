<template lang="pug">
transition(name="slide_active" mode="in-out")
  #active_stop(:class="{ mobile: $store.state.mobile }")
    .content
      .header(@click="closeStop")
        .name {{ activeStop.name }}
        .campus {{ activeStop.campus}} Campus
      .routes
        transition-group(
              appear
              name="staggered-enter"
              :css="false"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave")
          .route(v-for="(route, index) in activeStop.schedule"
                 :data-index="index"
                 :key="route.route")
            .route-name {{ route.route }}
            .route-times
              .time(v-for="time in routeTimes(route)") {{ time }} min
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ActiveStop',
  data() {
    return {
      stop: {}
    }
  },
  computed: {
    activeStop() {
      return this.$store.getters.stop(this.$route.params.id)
    },
    campusColor() {
      switch (this.activeStop.campus.toLowerCase()) {
        case 'livingston':
          return '#3f72fe'
        case 'college ave':
          return '#d12424'
        case 'busch':
          return '#d32f2f'
        case 'newark':
          return '#5175dd'
        default:
          return '#f44336'
      }
    }
  },
  methods: {
    closeStop() {
      this.$router.push('/stops')
    },
    routeTimes(route) {
      const timesInMinutes = [];
      const currentEpochTime = Date.now();
      route.times.forEach((el) => {
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

#active_stop
  height: 100vh
  width: 100%
  position: absolute
  background: white
  font-family: 'Roboto'
  top: 0
  z-index: 400
  user-select: none

  .content
    position: relative
    min-height: 100vh
    box-shadow: 0 -2px 3px rgba(#000000, 0.2)
    z-index: 500
    background: white

.header
  padding: 24px 24px
  color: white
  border-bottom: 1px solid #CCC
  transition: .3s
  background: $primary
  box-shadow: 0 0 4px rgba(#000000, 0.4)

  .campus
    font-size: 1.1rem
    font-family: 'Kollektif'
    padding-bottom: 4px
  .name
    font-size: 1.9rem
    padding: 8px 0
    font-family: 'Kollektif'
    line-height: 32px
    font-weight: bold



.routes
  overflow: hidden
  font-family: 'Roboto'
  height: 100vh


.route
  padding: 16px 24px
  border-bottom: 1px solid #CCC
  position: relative
  background: white

  &:hover
    background: #F2F2F2
    cursor: pointer

.route-name
  line-height: 26px
  font-weight: 500
  font-size: 1.1rem

.route-campus
  position: absolute
  top: 23px
  right: 28px
  color: #888
  font-weight: 500
  font-family: 'Kollektif'

.route-times
  padding-top: 8px

.time
  display: inline-block
  margin-right: 8px

.route-summary
  font-size: 1rem
  margin-top: 10px
  line-height: 22px
  color: #999

.slide_active-enter-active
  transition: .15s ease-out

.slide_active-leave-active
  transition: .1s ease-out

.slide_active-enter, .slide_active-leave-to
  transform: translateY(40px)
  opacity: 0
</style>
