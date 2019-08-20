<template lang="pug">
.stop-marker(@click="goToStop" :class="{indicated: indicated }")
  .ref
    .base
      .text {{ name }}
</template>

<script>
import EventBus from '@/event-bus.js';

export default {
  data() {
    return {
        indicated: false
    }
  },
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
  mounted() {
    EventBus.$on('INDICATE_STOP', (id) => {
      if (id == this.id) {
        console.log('client' + id)
        this.indicated = true
      } else {
        this.indicated = false
      }
    })
  }
}
</script>

<style lang="sass" scoped>
$size: 30px
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
      transform: scale(1.3) translateX(-45%)
      color: #ed5454

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
  background: white
  transform: translateX(-50%)
  border-radius: 5px
  box-shadow: 0 1px 8px rgba(#000000, 0.3)
  transition: top .2s, width .2s
  text-align: center
  font-weight: 600
  font-size: .9rem
  color: #666
  overflow: hidden
  transition: transform 0.1s

  &:hover
    box-shadow: 0 1px 5px rgba(#000000, 0.3)
    transition: transform 0.05s
    transform: scale(1.3) translateX(-45%)
    color: #ed5454


.text
  display: block
  height: $size
  opacity: 0.85
  -webkit-clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)
  white-space: nowrap
  line-height: $size + 1
  padding: 0 10px

</style>
