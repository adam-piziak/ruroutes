<template lang="pug">
section.stops(:style="height" :class="{'mobile': mobile}")
  GenericError(v-if="stops.length === 0") No Active Stops Found
  router-view
  Stop(
    v-for = "stop in filteredStops"
    :stop = "stop"
    :key = "stop.tag"
    )
</template>

<script>
import Stop from 'components/list-elements/Stop'
import GenericError from 'components/errors/GenericError'
import { mapGetters } from 'vuex'
export default {
  name: 'StopsPage',
  components: { Stop, GenericError },
  props: {
    searchActive: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'stops',
      'mobile',
      'activeStop',
      'filteredStops'
    ]),
    height() {
      if (this.searchActive) {
        return {
          height: 'calc(100vh - 60px)'
        }
      } else {
        return {
          height: 'calc(100vh - 130px)'
        }
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.stops
  height: 100px
  overflow-y: auto
  background: #F0F0F0

  &::-webkit-scrollbar
    width: 8px

  &::-webkit-scrollbar-thumb
    background: #AAA

  &::-webkit-scrollbar-track
    background: #DDD

  </style>
