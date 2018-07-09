<template lang="pug">
#SearchFab
</template>

<style lang="sass" scoped>
#SearchFab
  height: 60px
  width: 60px
  position: fixed
  right: 25px
  bottom: 20px
  background:
    color: #ff5252
    image: url(../assets/search.svg)
    position: center center
    repeat: no-repeat
    size: 50%
  border-radius: 30px
  box-shadow: 0 1px 3px rgba(#000000, 0.5)
  z-index: 300

  &:active
    background-color: #db4d4b
</style>
