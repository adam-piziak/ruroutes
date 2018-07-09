<template lang="pug">
.route-element-container(:class="{ 'active': active }" @click="toggle")
  .route-element(:style="routeStyle")

    .route-element-name-container(@click.stop="active = !active")
      .route-element-name(ref="routeElementName") {{ routeInfo.name }}

    .route-stops(v-if="active")
      RouteStop(
        v-for="stop in routeInfo.schedule"
        :stop_title="stop.stop_title"
        :key="stop.stop_title"
        :times="stop.times")
</template>

<script>
import RouteStop from './RouteStop.vue';

export default {
  name: 'RouteElement',
  data() {
    return {
      active: false,
      routeElementNameWidth: 0,
    };
  },
  components: { RouteStop },
  props: {
    routeInfo: {
      type: Object,
      required: true,
    },
    routeIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggle() {
      this.active = true;
      const m = this;
      setTimeout(() => {
        const elementName =
          document.getElementsByClassName('route-element-name')[this.routeIndex];
        m.routeElementNameWidth = elementName.clientWidth + 30;
      }, 0);
    },
  },
  computed: {
    routeStyle() {
      if (this.active) {
        return {
          top: '0',
          height: '100vh',
          zIndex: '140',
          background: 'white',
        };
      }
      return {};
    },
    offsetY() {
      if (this.active) {
        return (this.$el.offsetTop + 125) * -1;
      }
      return 0;
    },
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.active = false;
      }
    });
    const elementName =
      document.getElementsByClassName('route-element-name')[this.routeIndex];
    this.routeElementNameWidth = elementName.clientWidth;
  },
};
</script>

<style lang="sass" scoped>
$transition-speed: .14s
.route-element-container
  width: 100%
  height: 50px
  position: relative
  border-bottom: 1px solid #F2F2F2

  .route-element
    width: 100%
    height: 50px
    position: absolute
    top: 0
    background: white
    transition: top $transition-speed ease-out, height $transition-speed ease-out, padding-left .1s
    overflow: hidden

    &:hover
      background: #F5F5F5
      cursor: pointer

.route-element-name-container
  width: 380px
  height: 50px
  line-height: 50px
  padding: 0 20px
  transition: padding $transition-speed ease

  .route-element-name
    display: inline-block

  .route-element-name-border
    margin-left: 12px

.active
  .route-element-name-container
    margin-top: 20px
    padding-left: 30px
    width: 360px
    border-bottom: 1px solid #eee

    .route-element-name
      font-size: 1.2rem
      font-weight: 500
      color: #505050
      transform: translateY(-10px)

.route-stops
  overflow-y: auto
  overflow-x: hidden
  height: calc(100vh - 121px)
</style>
