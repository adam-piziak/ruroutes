<template lang="pug">
section#main_block
  header
    TheSearchBar(@search-input="searchInput = $event" @toggle-menu="globalNav = !globalNav" :query="searchInput")
    TheNavigation(@click.native="searchInput = ''")
  transition(name="swipe")
    TheActiveElement(v-show="itemOpened")
  TheSearchPage(v-if="searchInput.length > 0" :query="searchInput")
  template(v-else)
    transition(name="slide" mode="out-in")
      router-view(:searchActive="searchInput.length > 0")
  transition(name="swipe" mode="out-in")
    TheGlobalNavigation(v-show="globalNav" @closeGlobalNav="globalNav = false")
</template>

<script>
import TheHeader           from 'components/TheHeader'
import TheSearchBar        from 'components/TheSearchBar'
import TheNavigation       from 'components/TheNavigation'
import TheGlobalNavigation from 'components/TheGlobalNavigation'
import TheActiveElement    from 'components/active-element/TheActiveElement'
import TheSearchPage       from '@/pages/SearchPage.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      searchInput: "",
      globalNav: false,
      scheduler: null,
    }
  },
  computed: {
    ...mapGetters(['mobile']),
    searchNeeded() {
      const path = this.$store.state.route.path
      return path.includes('/routes') || path.includes('/stops')
    },
    itemOpened() {
      return this.$route.params.id != undefined
    }
  },
  methods: {
    closeSearch() {
      this.search = false
      this.$store.commit('SET_SEARCH_QUERY', '')
    }
  },
  components: {
    TheHeader,
    TheSearchBar,
    TheNavigation,
    TheActiveElement,
    TheGlobalNavigation,
    TheSearchPage
  },
  mounted() {
    let ctx = this
    this.$store.dispatch('UPDATE_ROUTE_LIST')
    this.$store.dispatch('UPDATE_STOP_LIST')
    this.scheduler = setInterval(() => {
      ctx.$store.dispatch('UPDATE_ROUTE_LIST')
      ctx.$store.dispatch('UPDATE_STOP_LIST')
    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.scheduler)
  }
}
</script>

<style lang="sass">
#main_block
  position: relative
  background: #EEE
  display: flex
  flex-direction: column
  width: 460px
  min-width: 300px
  height: 100vh
  overflow: hidden
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2)
  z-index: 10

header
  position: relative
  z-index: 100
  background: white
  z-index: 10
  box-shadow: 0 1px 3px rgba(#000000, 0.2)

@media (max-width: 1024px)
  #main_block
    width: 100vw

.slide-enter-active, .slide-leave-active
  transition: .1s

.slide-enter, .slide-leave-to
  transform: translateY(8px)
  opacity: .1

.swipe-enter-active, .swipe-leave-active
  transition: .2s

.swipe-enter, .swipe-leave-to
  transform: translateX(-100%)

.element-enter-active, .element-leave-active
  transition: .1s ease-out
  position: absolute
  top: 0

.element-enter, .element-leave-to
  transform: translateY(10px)
  opacity: 0
  position: absolute
  top: 0

.zoom-enter-active, .zoom-leave-active
  transition: .15s ease-out

.zoom-enter, .zoom-leave-to
  transform: scale(0)

</style>
