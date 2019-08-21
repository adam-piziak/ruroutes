<template lang="pug">
.stop-marker(@click="goToStop" @mouseover="hover=true" @mouseleave="hover=false" :class="{indicated: showText  }")
  .ref
    .base
      .text(v-if="!showText") {{ order }}
      .text(v-else) {{ name }}
</template>

<script>
import EventBus from '@/event-bus.js';

export default {
  data() {
    return {
        indicated: false,
        hover: false
    }
  },
  props: {
    id: Number,
    order: Number,
    name: String
  },
  methods: {
    goToStop() {
      this.$parent.$router.push(`/stops/${this.id}`)
      EventBus.$emit('GO_TO_STOP', this.id);
    }
  },
  computed: {
    showText() {
      return (this.indicated || this.order === -1 || this.hover)
    }
  },
  mounted() {
    EventBus.$on('INDICATE_STOP', (id) => {
      if (id == this.id) {
        this.indicated = true
      } else {
        this.indicated = false
      }
    })
  }
}
</script>

<style lang="sass" scoped>
$size: 28px
$dot-size: 7px
$offset: 5px
@mixin centered
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.stop-marker
  position: absolute
  height: $size
  min-width: $size


  &.indicated
    z-index: 1000

    .base
      box-shadow: 0 1px 5px rgba(#000000, 0.3)
      transition: transform 0.05s
      transform: scale(1.1) translateX(-45%)
      padding: 0 16px

  &:hover
    cursor: pointer
    z-index: 1000


  &.inactive .base
    background: #EEE
    border: 2px solid gray
    color: darkgray

.ref
  position: relative
  height: $size

.base
  height: $size
  position: absolute
  background: #FFF
  transform: translateX(-50%)
  box-shadow: 0 1px 5px rgba(#000000, 0.2)
  border-radius: 50px

  &:hover
    box-shadow: 0 1px 5px rgba(#000000, 0.3)
    transition: transform 0.05s
    transform: scale(1.3) translateX(-45%)


.text
  color: #ed5454
  display: inline-block
  text-align: center
  height: $size
  min-width: $size
  opacity: 0.85
  font-weight: 500
  white-space: nowrap
  line-height: $size


</style>
