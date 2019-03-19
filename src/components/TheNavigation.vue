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
$active-color: #f44848
$hover-color: #f44848

nav
  display: flex

  position: relative
  background: white
  padding: 0px 24px
  //height: $height + 20px
  z-index: 1
  //box-shadow: 0 2px 1px rgba(#000000, 0.15)
  padding-bottom: 20px
  border-bottom: 1px solid #eee

  .tab
    //height: $height
    //min-width: 50px
    display: inline-block
    max-width: 150px
    font-size: 1rem
    //padding: 10px 0
    position: relative
    background: white
    overflow: hidden
    border: 1px solid lightgray
    border-radius: 100px
    padding-left: 14px
    padding-right: 18px
    padding-top: 3px
    padding-bottom: 3px
    margin-right: 20px

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
      border: 1px solid white

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

    .tab_text
      text-align: center
      color: #222
      letter-spacing: -.02rem
      font-weight: 500
      user-select: none
      display: inline-block
      line-height: 24px
      vertical-align: super
      margin-left: 2px


    .tab_icon
      vertical-align: text-bottom

      display: inline-block
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

      &:not(:last-child)::after
        background: rgba(#000000, 0.01)

      .tab_text
        color: #FFF

      .tab_icon
        opacity: 1

</style>
