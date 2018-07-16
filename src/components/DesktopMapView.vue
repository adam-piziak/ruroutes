<template lang="pug">
  section#map-view
    #map
</template>

<script>

export default {
  mounted() {
    const mapboxgl = require('mapbox-gl')
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbS1waXppYWsiLCJhIjoiY2poa3gxeGw2Mnl2YTNibjNpdmkwM2t6cCJ9.oST8MV_wyXjmfOY4IPH1JA';
    const mapview = new mapboxgl.Map({
      container: 'map',
      style: 'https://maps.tilehosting.com/styles/basic/style.json?key=K7rAuvC67gIS7xy6bcOa',
      center: [-74.447672, 40.502281],
      zoom: 14.5,
    });
  },
}
</script>

<style lang="sass" scoped>
#map-view
  position: absolute
  left: 500px
  top: 0
  width: calc(100vw - 500px)
  height: 100vh
  z-index: 0

#map
  height: 100vh
</style>
