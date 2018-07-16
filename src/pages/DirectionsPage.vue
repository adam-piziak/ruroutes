<template lang="pug">
#DirectionsPage
  input.origin(placeholder="Origin" autofocus)
  input.destination(placeholder="Destination")
</template>

<script>

</script>
<style lang="sass" scoped>
#DirectionsPage
  padding: 20px
  background: white

$input-height: 30px
input
  height: $input-height
  line-height: $input-height
  text-indent: 10px
  margin: 5px 0
  display: block
  outline: 0
  border: 0
  background: #EEE

  &:focus
    background: #DDD
</style>
