<template lang="pug">
#global
  .close_button(@click="$emit('closeGlobalNav')")
    .close_icon
  a(href="https://api.scarletbus.com/graphql").link ruroutes API
  a(href="https://github.com/adam-piziak/scarletbus-web").link source code
</template>

<style lang="sass" scoped>

.link
  padding: 20px
  font-weight: bold
  font-size: 1.2rem
  color: #444
  display: block
  &:hover
    color: #666
    cursor: pointer
    text-decoration: underline

#global
  width: 100%
  height: 100vh
  position: absolute
  top: 0
  left: 0
  background: white
  color: #FFF
  z-index: 1000
  padding: 40px
  user-select: none

.close_button
  float: right
  display: inline-block

  &:hover
    cursor: pointer

  .close_text
    float: left
    height: 50px
    line-height: 48px
    font-weight: bold
    font-size: 1.2rem
  .close_icon
    display: inline-block
    height: 50px
    width: 50px
    background:
      color: transparent
      image: url('~icons/close.svg')
      position: center
      repeat: no-repeat
      size: 70%
</style>
