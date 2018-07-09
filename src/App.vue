<template lang="pug">
div#app
  Main
</template>

<script>
import Main from '@/components/Main.vue'

export default {
  components: {
    Main
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700')
$font_path: './fonts/Kollektif.ttf'

*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: 'roboto'
</style>
