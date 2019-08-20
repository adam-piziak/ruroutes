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
$active-color: #ed5454
$hover-color: #f44848

nav
  display: flex
  position: relative
  //height: $height + 20px
  //box-shadow: 0 2px 1px rgba(#000000, 0.15)
  margin-top: 8px
  user-select: none
  justify-content: space-between
  margin: 8px 12px


  .tab
    min-width: $height
    height: $height - 5px
    display: inline-block
    max-width: 150px
    font-size: 1rem
    position: relative
    background: white
    overflow: hidden
    border-radius: 8px
    padding: 5px 10px
    border: 1px solid transparent

    &:active
      transform: scale(1.07)



    &:not(.active)
      //border: 1px solid #EEE

    .tab_text
      text-align: center
      color: #555
      font-weight: 500
      user-select: none
      display: block
      line-height: 24px
      vertical-align: super
      margin-left: 2px


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


    &.gray .tab_text
      color: #AAA

    &.routes
      .tab_icon
        background-image: url(~icons/bus_outline.svg)

      &.active .tab_icon, &.active:hover .tab_icon
        opacity: .9
        background-image: url(~icons/nav_routes.svg)

    &.stops
      .tab_icon
        background-image: url(~icons/place_outline.svg)

      &.active .tab_icon, &.active:hover .tab_icon
        opacity: .9
        background-image: url(~icons/nav_stops.svg)

    &.directions
      .tab_icon
        background-image: url(~icons/nav_outline.svg)

      &.active .tab_icon, &.active:hover .tab_icon
        opacity: .9
        background-image: url(~icons/nav_directions.svg)
    &.schedule
      .tab_icon
        background-image: url(~icons/nav_schedule.svg)

      &:hover .tab_icon, &.active .tab_icon, &.active:hover .tab_icon
        background-image: url(~icons/nav_schedule_active.svg)

    &.active, &.active:hover
      background: #F8F8F8
      .tab_text
        color: $active-color

    &:hover
      background: #F8F8F8
      cursor: pointer



</style>
