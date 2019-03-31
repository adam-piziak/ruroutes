<template lang="pug">
section#search
  .menu-button(@click="$emit('toggle-menu')")
  input(type="text"
        ref="search_input"
        v-model="query"
        placeholder="Search rutgers buses by route, stop or campus"
        @input="updateSearchQuery"
        aria-label="search input")
  #close(@click="$emit('closeSearch')" v-if="mobile")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheSearchBar',
  data() {
    return {
      focusSearch: false
    }
  },
  props: {
    query: String
  },
  computed: {
    ...mapGetters(['mobile'])
  },
  methods: {
    updateSearchQuery (e) {
      this.$emit('search-input', e.target.value)
    }
  },
  mounted() {
    const v = this
    setTimeout(function () {
      v.$refs.search_input.focus()
    }, 50);
  }
}
</script>

<style lang="sass" scoped>

$height: 50px
$close-margin: 14px

#close
  height: $height - ($close-margin*2 + 2)
  width: $height - ($close-margin*2 + 2)
  display: inline-block
  background:
    color: #555
    image: url(../assets/icons/close.svg)
    position: center
    repeat: no-repeat
    size: 65%
  margin: $close-margin
  border-radius: $height

  &:hover
    cursor: pointer

  &:active
    background-color: #000

#search
  display: flex
  background: white
  position: relative
  z-index: 1
  flex-shrink: 0
  margin: 12px
  border-radius: 5px
  overflow: hidden
  box-shadow: 0 1px 5px rgba(#000000, 0.3)
  &.mobile
    background: #ef5350

    #filter
      color: white

      .icon
        background-image: url('/icons/filter_white.svg')
    input::placeholder
      color: white
      font-weight: bold
input
  border: 0
  outline: none
  line-height: $height - 2
  width: 240px
  flex-grow: 1
  font-size: 1rem
  font-size: 1.05rem

  &::placeholder
    opacity: 1
    font-size: 1rem
    font-weight: normal
    color: #888

.menu-button
  height: $height
  width: $height
  background:
    image: url('~icons/logo.svg')
    repeat: no-repeat
    position: center
    size: 50%
  opacity: 0.8
  transition: opacity 5s

  &:hover
    cursor: pointer

  &:active
    transition: opacity 0
    opacity: 0.1

.logo
  height: $height
  width: $height
  position: absolute
  right: 0
  background:
    color: transparent
    image: url('~icons/logo.svg')
    repeat: no-repeat
    position: center
    size: 40%
  opacity: 0.8
  transform: rotate(90deg)
  transition: opacity 5s
#filter
  display: flex
  justify-content: space-around
  width: 100px
  position: relative
  line-height: 44px

  &:hover
    background: #EEE
    cursor: pointer

  .icon
    width: 44px
    height: 44px
    opacity: .9
    background:
      color: transparent
      image: url('/icons/filter_white.svg')
      repeat: no-repeat
      position: center center
      size: 50%

  .text
    margin-left: 20px
    text-align: center
    opacity: .7


.divider
  width: 1px
  height: $height / 2
  position: absolute
  top: 10px
  left: 0
  background: #dbdbdb
  transition: .2s
</style>
