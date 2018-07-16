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
  methods: {
    openStop() {
      this.$router.push('/stops/' + this.stop.tag)
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
  width: 100%
  height: 60px
  padding: 10px
  background: white
  border-bottom: 1px solid #EEE
  user-select: none

  &:hover
    cursor: pointer
    background: $primary

    .stop-name
      color: white
      font-weight: bold

    .stop-campus
      color: #FAFAFA

.stop-name
  font-size: 1.1rem
  color: #202020

.stop-campus
  color: #575757
  margin-top: 4px

</style>
