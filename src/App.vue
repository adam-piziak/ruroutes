<template lang="pug">
div#app
  Main
  DesktopMapView(v-if="!mobile")
</template>

<script>
import Main from '@/components/Main.vue'
import DesktopMapView from 'components/DesktopMapView';

export default {
  components: {
    Main, DesktopMapView
  },
  computed: {
    mobile() {
      return this.$store.state.mobile
    }
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: 'verdana'
</style>
