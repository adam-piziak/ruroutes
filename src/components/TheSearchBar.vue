<template lang="pug">
section#search
  .menu-button(@click="$emit('toggle-menu')")
  input(type="text"
        ref="search_input"
        :value="query"
        placeholder="Search rutgers buses by route or stop"
        @input="updateSearchQuery"
        aria-label="search input")
  transition(name="clear")
    .clear-button(v-show="query.length > 0" @click.prevent="clearQuery")
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
  methods: {
    updateSearchQuery (e) {
      this.$emit('search-input', e.target.value)
    },
    clearQuery() {
      this.$emit('search-input', '')
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
  padding: 5px 10px
  overflow: hidden
  border-bottom: 1px solid #DDD
  &.mobile
    background: #ef5350

    #filter
      color: white

      .icon
        background-image: url('/icons/menu.svg')
    input::placeholder
      color: white
      font-weight: bold
input
  border: 0
  outline: none
  line-height: $height - 2
  width: 240px
  text-indent: 10px
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
    image: url('~icons/menu.svg')
    repeat: no-repeat
    position: center
    size: 50%
  opacity: 0.7
  transition: transform .0s

  &:hover
    cursor: pointer

  &:active
    transform: scale(1.2)


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

.clear-button
  height: 30px
  width: 30px
  background:
    image: url(~icons/close.svg)
    position: center
  position: absolute
  top: 50%
  right: 10px
  transform: translateY(-50%)
  opacity: 0.8
  border-radius: 50%
  transition: transform .15s, background .15s ease-out

  &:hover
    cursor: pointer
    background-color: #EEE

  &:active
    transform: translateY(-50%) scale(1.2)

  &:hover::before
    height: 20px
    width: 20px
    background: pink

.clear-enter-active, .clear-leave-active
  transition: .1s ease-out
  transform: translateY(-50%) scale(1)

.clear-enter, .clear-leave-to
  transform: translateY(-50%) scale(0)
</style>
