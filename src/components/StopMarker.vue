<template lang="pug">
.stop-marker(@click="goToStop")
  .ref
    .base
      .text {{ name.substring(0, 2) }}
</template>

<script>
import EventBus from '@/event-bus.js';

export default {
  props: {
    id: Number,
    name: String
  },
  methods: {
    goToStop() {
      console.log(this);
      this.$parent.$router.push(`/stops/${this.id}`)
      EventBus.$emit('GO_TO_STOP', this.id);
    }
  },
}
</script>

<style lang="sass" scoped>
$size: 30px
@mixin centered
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.stop-marker
  position: absolute
  height: $size
  width: $size

  &:hover
    cursor: pointer

  &.inactive .base
    background: #EEE
    border: 2px solid gray
    color: darkgray

.ref
  position: relative
  height: $size
  width: $size

.base
  position: absolute
  height: $size
  width: $size
  background: white
  border-radius: 50px
  box-shadow: 0 1px 5px rgba(#000000, 0.1)
  border: 2px solid #e37d7d
  transition: top .2s, width .2s
  text-align: center
  line-height: $size*0.94
  font-weight: 600
  font-size: .9rem
  color: #666
  overflow: hidden
  transition: transform 0.1s

  &:hover
    box-shadow: 0 1px 5px rgba(#000000, 0.3)
    transition: transform 0.05s
    transform: scale(1.2)


</style>
