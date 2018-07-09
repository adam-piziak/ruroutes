<template lang="pug">
.stop(@click="openStop")
  .stop-name {{ stop.name }}
  .stop-campus {{ stop.campus}}
</template>

<script>
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
  computed: {
    active() {
      return this.stop.tag === this.activeStop.tag
    },
    ...mapGetters([
      'activeStop'
    ]),
  },
  methods: {
    openStop() {
      // this.$store.commit('SET_SEARCH_QUERY', '')
      this.$router.push('/stops/' + this.stop.tag)
    },
    ...mapMutations({
      setActiveStop: 'SET_ACTIVE_STOP'
    })
  }
};

</script>

<style lang="sass" scoped>
$speed: .3s

.stop
  width: 100%
  height: 70px
  padding: 10px
  background: white
  border-bottom: 1px solid #EEE
  user-select: none

  &:hover
    cursor: pointer
    background: #EEE

.stop-name
  font-size: 1.1rem
  color: #202020

.stop-campus
  color: #575757

</style>
