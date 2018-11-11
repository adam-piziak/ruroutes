<template lang="pug">
section#search
  input(type="text"
        ref="search_input"
        placeholder="Search by route, stop or campus"
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
  computed: {
    ...mapGetters(['mobile'])
  },
  methods: {
    updateSearchQuery (e) {
      this.$store.commit('SET_SEARCH_QUERY', e.target.value)
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
  border-top: 1px solid #dbdbdb
  display: flex
  background: white
  position: relative
  z-index: 1
  border-bottom: 1px solid #DDD
  flex-shrink: 0
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
  height: $height - 2
  width: 240px
  flex-grow: 1
  font-size: 1rem
  padding-left: 30px
  font-weight: bold
  font-size: 1.05rem
  text-transform: uppercase

  &::placeholder
    opacity: 1
    font-size: 1rem
    font-weight: normal
    color: #AAA
    text-transform: lowercase

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
