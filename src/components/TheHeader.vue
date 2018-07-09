<template lang="pug">
header
  div#logo(@click="$router.push('/')") ru routes
  #links(@click.stop="$emit('activeGlobal')")
</template>

<script>
export default {
  name: 'TheHeader'
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

#links
  height: $height * 2/3
  width: $height *2/3
  margin-top: $height * 1/6
  margin-right: $height * 1/6 + 5px
  background:
    image: url('../assets/more.svg')
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
  color: #e53935
  font-size: 1.4rem
  height: $height - 1
  padding: 0 30px
  user-select: none
  font-family: 'Kollektif'

  &:hover
    cursor: pointer
</style>
