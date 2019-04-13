<template lang="pug">
.route(@click="openRoute" :class="{'inactive': !route.active}")
  .name {{ route.name }}
    span.inactive-text(v-if="!route.active") inactive
  .areas
    .area(v-for="area in route.areas") {{ area }}
</template>

<script>
import EventBus from '@/event-bus.js';

export default {
  name: 'Route',
  props: {
    route: {
      type: Object,
      required: true,
    }
  },
  methods: {
    openRoute() {
      this.$router.push('/routes/' + this.route.id)
      //EventBus.$emit('GO_TO_ROUTE', this.route.id);
    }
  }
};
</script>

<style lang="sass" scoped>
@import "styles/colors.sass"

$height: 50px
.route
  position: relative
  background: white
  padding: 16px 20px
  user-select: none
  transition: padding .05s
  border-bottom: 1px solid #EEE


  &:hover
    cursor: pointer
    opacity: .99
    //box-shadow: 0 0px 5px rgba(#000000, 0.2)
    z-index: 20
    padding-left: 25px
    padding-right: 15px
    font-weight: 500

  &.inactive
    opacity: 0.8

.inactive-text
  color: #ed4040
  float: right

.name
  margin-bottom: 4px
  font-weight: 500

.area
  display: inline-block
  color: #666
  padding-top: 5px
  &:not(:last-child)::after
    content: "·"
    margin: 0 6px
    font-weight: 900
</style>
