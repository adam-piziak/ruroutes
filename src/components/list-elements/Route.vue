<template lang="pug">
.route(@click="openRoute")
  .name {{ route.name }}
  .route_campus(v-for="campus in route.campuses") {{ campus }}
</template>

<script>
export default {
  name: 'Route',
  props: {
    route: {
      type: Object,
      required: true,
    }
  },
  methods: {
    openRoute() {
      this.$router.push('/routes/' + this.route.tag)
    }
  }
};
</script>

<style lang="sass" scoped>
@import "styles/colors.sass"

$height: 50px
.route
  background: white
  padding: 16px 20px
  border-bottom: 1px solid #EEE
  user-select: none
  transition: padding .3s

  &:hover
    cursor: pointer
    opacity: .99
    box-shadow: 0 1px 8px rgba(#000000, 0.2)
    z-index: 20
    padding-left: 25px
    font-weight: 500

.name
  margin-bottom: 4px
  font-weight: 500

.route_campus
  display: inline-block
  color: #222
  font-weight: 300
  text-transform: capitalize

  &:not(:last-child)::after
    content: "·"
    margin: 0 6px
    font-weight: 900
</style>
