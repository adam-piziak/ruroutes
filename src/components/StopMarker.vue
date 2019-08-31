<template lang="pug">
.stop-marker(@click="goToStop" @mouseover="expandText(false)" @mouseleave="collapseText" :class="{indicated: showText  }")
  .ref
    .base(:class="{display: showText}")
      .number(v-if="order != -1") {{ order }}
      .text(ref="text") {{ name }}
</template>

<script>
import EventBus from '@/event-bus.js';

export default {
  data() {
    return {
        active: false,
        indicated: false,
        hover: false,
        textWidth: 0,
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
    },
    expandText(isStop) {
      const text = this.$refs.text
      const textWidth = this.textWidth + 14
      if (isStop) {
        text.style.textAlign = 'center'
      }
      text.style.width = textWidth + 'px'
    },
    collapseText() {
      if (this.order != -1) {
        const text = this.$refs.text.style.width = '0px'
      }

    }
  },
  computed: {
    showText() {
      return (this.indicated || this.order === -1 || this.hover || this.active)
    }
  },
  mounted() {
    EventBus.$on('INDICATE_STOP', (id) => {
      if (id == this.id) {
        this.expandText(false)
        this.indicated = true
      } else {
        this.collapseText(false)
        this.indicated = false
      }
    })
    setTimeout(() => {
      this.textWidth = this.$refs.text.scrollWidth
      if (this.order == -1) { this.expandText(true)}
      this.collapseText(false)
    }, 10)
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
      box-shadow: 0 1px 8px rgba(#000000, 0.3)
      transform: scale(1.1)
      transition: transform 0.05s

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
  display: flex
  margin-left: - $size/2
  box-shadow: 0 1px 5px rgba(#000000, 0.2)
  border-radius: 50px
  overflow: hidden
  transition: .15s

  &:hover
    box-shadow: 0 1px 12px rgba(#000000, 0.3)
    transform: scale(1.1)
    transition: transform 0.05s



.number
  color: #666
  background: #FFF
  display: inline-block
  border-radius: 100px
  text-align: center
  height: $size
  min-width: $size
  opacity: 0.85
  font-weight: 800
  line-height: $size
  float: left

.text
  display: inline-block
  line-height: $size
  white-space: nowrap
  text-align: left
  transition: .22s
  font-weight: 500
  float: left
  color: #666





</style>
