<template lang="pug">
section#main_block
  transition(name="zoom" mode="out-in")
    #head(v-if="!search")
      TheHeader(@activeGlobal="globalNav = true" v-if="!search")
      TheNavigation(v-if="!search")
    TheSearchBar(v-else @closeSearch="closeSearch")
  transition(name="zoom")
    TheSearchBar(v-if="!mobile && searchNeeded")
  TheActiveElement(v-if="itemOpened")
  transition(name="slide" mode="out-in")
    router-view(:searchActive="search")
  transition(name="slide")
    TheGlobalNavigation(v-if="globalNav" @closeGlobalNav="globalNav = false")
  transition(name="zoom")
    TheSearchFAB(v-if="!search && mobile && searchNeeded" @click.native="search=true")
</template>

<script>
import TheHeader           from 'components/TheHeader'
import TheSearchBar        from 'components/TheSearchBar'
import TheNavigation       from 'components/TheNavigation'
import TheGlobalNavigation from 'components/TheGlobalNavigation'
import TheActiveElement    from 'components/active-element/TheActiveElement'
import TheSearchFAB        from 'components/TheSearchFAB'

import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      search: false,
      globalNav: false,
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
    TheSearchFAB
  }
}
</script>

<style lang="sass">
#main_block
  position: relative
  background: white
  display: flex
  flex-direction: column
  width: 500px
  min-width: 300px
  height: 100vh
  overflow: hidden
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2)
  z-index: 10

@media (max-width: 1024px)
  #main_block
    width: 100vw

.slide-enter-active, .slide-leave-active
  transition: .15s

.slide-enter, .slide-leave-to
  transform: translateY(20px)
  opacity: .1

.fade-enter-active, .fade-leave-active
  transition: .2s
  position: absolute
  top: 0

.fade-enter, .fade-leave-to
  transform: translateY(-16px)
  opacity: 0
  position: absolute
  top: 0

.zoom-enter-active, .zoom-leave-active
  transition: .15s ease-out

.zoom-enter, .zoom-leave-to
  transform: scale(0)

</style>
