<template lang="pug">
.route(@click="openRoute")
  .name {{ route.name }}
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
  padding: 16px
  height: $height
  border-bottom: 1px solid #EEE
  user-select: none

  &:hover
    background: $primary
    cursor: pointer

    .name
      font-weight: bold
      color: white
</style>
