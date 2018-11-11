<template lang="pug">
header
  div#logo(@click="$router.push('/')") ru routes
  #links(@click.stop="$emit('activeGlobal')")
</template>

<script>
export default {
  name: 'TheHeader',
  computed: {
    resolvingRoute() {
      return this.$store.state.resolvingRoute
    }
  }
}
</script>

<style lang="sass" scoped>
$height: 50px

header
  position: relative
  background: white
  height: $height
  line-height: $height
  border-bottom: 1px solid #EEE

  &.red
    background: red
.connection
  position: relative
  display: inline-block
  height: $height
  flex-grow: 1
  padding-right: 10px

  .text
    position: absolute
    right: 40px
  .indicator
    position: absolute
    top: 50%
    right: 20px
    transform: translateY(-50%)
    height: 10px
    width: 10px
    background: #10cc23
    border-radius: 50%
    vertical-align: middle
    float: right
#links
  height: $height * 2/3
  width: $height *2/3
  margin-top: $height * 1/6
  margin-right: $height * 1/6 + 5px
  background:
    image: url('~icons/more.svg')
    repeat: no-repeat
    position: center center
    size: 90%
  opacity: 1
  display: inline-block
  float: right
  padding-right: 5px
  border-radius: $height

  &:hover
    cursor: pointer
    background-color: rgba(#ffffff, 0.2)

    &:active
      background-color: rgba(#ffffff, 0.4)

.links
  display: inline-block
  float: right
  color: #757575

  span
    padding: 0 15px
    float: left
    display: inline-block

    &:last-child
      padding-right: 20px
    &:hover
      cursor: pointer
      color: black
      text-decoration: underline
#logo
  display: inline-block
  color: #2e3440
  font-size: 1.2em
  height: $height - 1
  padding: 0 30px
  user-select: none
  font-family: 'Kollektif'
  font-weight: bold

  &:active
    background: #EEE

  &:hover
    cursor: pointer
</style>
