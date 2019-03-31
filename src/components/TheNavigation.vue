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
  padding-bottom: 20px
  margin-top: 8px
  border-bottom: 1px solid #eee
  user-select: none

  .tab
    //height: $height
    min-width: 80px
    display: inline-block
    max-width: 150px
    font-size: 1rem
    margin: 0 10px
    //padding: 10px 0
    position: relative
    background: white
    overflow: hidden
    border: 1px solid lightgray
    border-radius: 8px
    padding: 5px
    box-shadow: 0 0 1px rgba(#000000, 0.2)

    .tab_text
      text-align: center
      color: #555
      letter-spacing: -.02rem
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
      opacity: .6
      background:
        color: transparent
        position: center center
        repeat: no-repeat
        size: 100%


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
      box-shadow: 0 1px 4px rgba(#000000, 0.25)

      //height: $height

      .tab_text
        color: white

      .tab_icon
        opacity: 1

      &:not(:last-child)::after
        background: rgba(#ffffff, 0.01)


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

      &:not(:last-child)::after
        background: rgba(#000000, 0.01)

      .tab_text
        color: #FFF

      .tab_icon
        opacity: 1

    &:active
      cursor: grabbing
      box-shadow: 0 1px 4px rgba(#000000, 0.25)


</style>
