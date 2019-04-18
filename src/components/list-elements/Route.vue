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
  transition: .05s
  border-bottom: 1px solid #DDD


  &:hover
    cursor: pointer
    box-shadow: 0 0px 3px rgba(#000000, 0.2)
    z-index: 20
    transform: translateX(5px)

  &.inactive
    opacity: 0.8

.inactive-text
  color: #ed4040
  float: right

.name
  margin-bottom: 4px
  font-weight: 500
  color: #444

.area
  display: inline-block
  font-size: 1rem
  color: #888
  background: #F5F5F5
  padding: 4px 8px
  border-radius: 8px
  margin: 5px 0px

  &:not(:last-child)
    margin-right: 10px

</style>
