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
$height: 50px
.route
  background: white
  padding: 16px
  height: $height

  &:hover
    background: #AAA
    cursor: pointer
</style>
