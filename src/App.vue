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
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700')
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: 'Roboto', sans-serif

</style>
