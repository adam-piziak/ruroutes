<template lang="pug">
.bus-marker
  .ref
    .base
    .pulse
</template>

<style lang="sass" scoped>
$size: 30px
$color: #555
@mixin centered
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
.bus-marker
  position: absolute
  width: $size
  height: $size

  &:hover
    cursor: default

.ref
  position: relative
  width: $size
  height: $size

.base
  position: relative
  z-index: 10
  @include centered
  width: $size*0.3
  height: $size*0.3
  background: $color
  border-radius: 50%

.pulse
  position: relative
  width: $size
  height: $size
  z-index: 9
  background: $color
  opacity: 0.1
  border-radius: 50%
  animation:
    name: pulse
    duration: 2.5s
    timing-function: ease-out
    iteration-count: infinite

@keyframes pulse
  from
    opacity: .9
    transform: scale(.2)
  to
    opacity: 0
    transform: scale(1)

</style>
