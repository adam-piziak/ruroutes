<template lang="pug">
nav
  div.tab.routes(
    @click="$router.push('/routes')"
    :class="{ 'active': currentPath === '/routes'}"
  )
    div.tab_icon
    div.tab_text Routes
  div.tab.stops(
    @click="$router.push('/stops')"
    :class="{ 'active': currentPath === '/stops'}"
  )
    div.tab_icon
    div.tab_text Stops
  div.tab.directions(
    @click="$router.push('/directions')"
    :class="{ 'active': currentPath === '/directions'}"
  )
    div.tab_icon
    div.tab_text Directions
  div.tab.schedule(
    @click="$router.push('/schedule')"
    :class="{ 'active': currentPath === '/schedule'}"
  )
    div.tab_icon
    div.tab_text Schedule
</template>

<script>
export default {
  name: 'TheNavigation',
  computed: {
    currentPath() {
      return this.$store.state.route.path;
    }
  }
}
</script>

<style lang="sass" scoped>
@import "styles/colors.sass"

$height: 80px
$active-color: #f44848
$hover-color: #f44848

nav
  display: flex
  justify-content: space-around
  position: relative
  background: white
  height: $height
  z-index: 1
  box-shadow: 0 2px 1px rgba(#000000, 0.15)

  .tab
    height: $height
    min-width: 50px
    display: inline-block
    flex: auto
    flex-basis: auto
    font-size: 1rem
    padding: 10px 0
    position: relative
    background: white
    overflow: hidden

    &.gray .tab_text
      color: #AAA

    &.routes
      .tab_icon
        background-image: url(~icons/nav_routes.svg)

      &:hover .tab_icon, &.active .tab_icon, &.active:hover .tab_icon
        background-image: url(~icons/nav_routes_white.svg)

    &.stops
      .tab_icon
        background-image: url(~icons/nav_stops.svg)

      &:hover .tab_icon, &.active .tab_icon, &.active:hover .tab_icon
        background-image: url(~icons/nav_stops_white.svg)

    &.directions
      .tab_icon
        background-image: url(~icons/nav_directions.svg)

      &:hover .tab_icon, &.active .tab_icon, &.active:hover .tab_icon
        background-image: url(~icons/nav_directions_white.svg)

    &.schedule
      .tab_icon
        background-image: url(~icons/nav_schedule.svg)

      &:hover .tab_icon, &.active .tab_icon, &.active:hover .tab_icon
        background-image: url(~icons/nav_schedule_white.svg)

    &.active, &.active:hover
      background: $active-color
      height: $height

      .tab_text
        color: white
        font-weight: bold

      .tab_icon
        opacity: 1

      &:not(:last-child)::after
        display: none


    &:not(:last-child)::after
      content: ''
      position: absolute
      display: inline-block
      top: 0
      right: 0
      height: $height * 3/5
      margin-top: $height * 1/5
      width: 1px
      background: #EEE

    .tab_text
      text-align: center
      color: #222
      letter-spacing: -.02rem
      font-weight: 500
      user-select: none

    .tab_icon
      margin: auto
      height: 24px
      width: 24px
      margin: 5px auto
      opacity: .7
      background:
        color: transparent
        position: center center
        repeat: no-repeat
        size: 100%


    .vertical_line
      display: inline-block
      height: 40px
      width: 1px
      transition: .2s
      background: #E7E7E7
      position: absolute
      right: 0
      top: 25px

    &:hover
      background: $hover-color
      cursor: pointer
      height: $height

      &:not(:last-child)::after
        display: none

      .tab_text
        color: #FFF
        font-weight: bold

      .tab_icon
        opacity: 1

</style>
