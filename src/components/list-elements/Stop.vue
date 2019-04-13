<template lang="pug">
.stop(@click="openStop")
  .stop-name {{ stop.name }}
  .stop-campus {{ stop.area }}
</template>

<script>
import EventBus from '@/event-bus.js';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'StopElement',
  data() {
    return {
      stopStyle: {},
    };
  },
  props: {
    stop: {
      type: Object,
      required: true,
    }
  },
  methods: {
    openStop() {
      this.$router.push('/stops/' + this.stop.id)
      //EventBus.$emit('GO_TO_STOP', this.stop.id)
    },
    ...mapMutations({
      setActiveStop: 'SET_ACTIVE_STOP'
    })
  }
};

</script>

<style lang="sass" scoped>
@import "styles/colors.sass"

$speed: .3s

.stop
  position: relative
  width: 100%
  padding: 16px 20px
  background: white
  user-select: none
  z-index: 5
  transition: padding .15s, box-shadow .05s

  &:not(:last-child)
    border-bottom: 1px solid #EEE

  &:hover
    cursor: pointer
    opacity: .99
    box-shadow: 0 0px 5px rgba(#000000, 0.2)
    z-index: 20
    padding-left: 15px
    font-weight: 500

.stop-name
  font-size: 1.1rem
  color: #202020

.stop-campus
  color: #575757
  margin-top: 4px

</style>
