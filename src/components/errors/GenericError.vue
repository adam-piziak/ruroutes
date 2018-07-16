<template lang="pug">
#no_stops
  .error_icon
  .message
    slot
  router-link(to='/schedule') see bus schudule
  router-link(to='/status') check server status
</template>

<style lang="sass" scoped>
#no_stops
  background: white
  padding: 20px
  color: #555
  border-bottom: 1px solid #dbdbdb
  user-select: none

.error_icon
  display: inline-block
  opacity: .8
  height: 30px
  width: 30px
  background:
    image: url('/icons/error.svg')
    repeat: no-repeat
    position: center center

.message
  display: inline-block
  vertical-align: top
  padding-left: 10px
  height: 30px
  line-height: 30px
  font-size: 1.1rem
  font-weight: 500

a
  display: block
  color: #626262
  padding-left: 40px
  padding-top: 4px
  padding-bottom: 4px
  text-decoration: underline

  &:hover
    cursor: pointer
</style>
