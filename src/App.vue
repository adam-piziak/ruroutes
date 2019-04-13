<template lang="pug">
div#app
  Main
  DesktopMapView(v-if="!meta.mobile")
</template>

<script>
import Main from '@/components/Main.vue'
import DesktopMapView from 'components/DesktopMapView';

export default {
  components: {
    Main, DesktopMapView
  },
  computed: {
    meta() {
      return this.$store.getters.meta
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
