<template lang="pug">
.stop-marker(@click="goToStop" @mouseover="expandText" @mouseleave="collapseText" :class="{indicated: showText  }")
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
    expandText() {
      const text = this.$refs.text
      const textWidth = this.textWidth + 20
      text.style.width = textWidth + 'px'
    },
    collapseText() {
      if (this.order != -1) {
        const text = this.$refs.text
        text.style.width = '0px'
      }

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
        this.expandText()
        this.indicated = true
      } else {
        this.collapseText()
        this.indicated = false
      }
    })
    setTimeout(() => {
      this.textWidth = this.$refs.text.scrollWidth
      if (this.order == -1) { this.expandText()}
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
      box-shadow: 0 1px 5px rgba(#000000, 0.3)
      transition: transform 0.05s

      .number

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

  &:hover
    box-shadow: 0 1px 5px rgba(#000000, 0.3)
    transition: transform 0.05s

  &.display


.number
  color: #ed5454
  background: #FFF
  display: inline-block
  border-radius: 100px
  text-align: center
  height: $size
  min-width: $size
  opacity: 0.85
  font-weight: 500
  line-height: $size
  float: left

.text
  display: inline-block
  line-height: $size
  text-align: center
  white-space: nowrap
  transition: .15s
  float: left
  color: #666





</style>
