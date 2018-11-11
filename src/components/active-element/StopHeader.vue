<template lang="pug">
.stop-header
  .stop_title {{ activeStop.name }}
  .stop_campus {{ activeStop.campus }} Campus
</template>

<script>
import EventBus from '@/event-bus.js';
export default {
  computed: {
    activeStop() {
      return this.$store.getters.stop(this.$route.params.id)
    }
  },
  mounted() {
    EventBus.$emit('GO_TO_STOP', this.$route.params.id);
  }
}
</script>

<style lang="sass" scoped>
.stop-header
  padding: 28px 30px
  color: #222

  &:hover
    cursor: default

  .stop_title
    color: #202020
    font-size: 2rem
    font-weight: bold

  .stop_campus
    color: #666
    font-size: 1.3rem
    margin-top: 8px
</style>
