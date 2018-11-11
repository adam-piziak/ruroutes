<template lang="pug">
  section#map-view
    .loading(:class="{'loaded': loaded}")
      .box
        .map-label Loading Map
        .dots
          .dot
          .dot
          .dot
    #map
</template>

<script>
import EventBus from '@/event-bus.js';
import axios from 'axios';
export default {
  data() {
    return {
      map: null,
      currentMarker: null,
      buses: [],
      locationInterval: null,
      loaded: false
    }
  },
  mounted() {
    this.initialize()
/*
    EventBus.$on('GO_TO_STOP', (tag) => {
      const stop = this.getStop(tag)
      this.buses.forEach((marker) => {
        marker.remove()
      })
      let ctx = this
      setTimeout(function () {
        ctx.map.flyTo({
          center: stop.location,
          zoom: 16
        });
      }, 400);

      if (this.currentMarker != null) this.currentMarker.remove()
      this.currentMarker = new mapboxgl.Marker({ color: "red" }).setLngLat(stop.location)
      this.currentMarker.addTo(this.map);
    })


    EventBus.$on('GO_TO_ROUTE', (tag) => {
      this.currentMarker.remove()
      axios.get(`http://localhost:8243/paths/${tag}`).then((res) => {
        let counter = 0;
        res.data.path.forEach((path) => {
          let coords = []
          path.point.forEach((point) => {
            coords.push([point.lon, point.lat])
          })
          this.map.addLayer({
            "id": `route${counter}`,
            "type": "line",
            "source": {
              "type": "geojson",
              "data": {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                      "type": "LineString",
                      "coordinates": coords
                  }
              }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "blue",
                "line-width": 2,
                "line-dasharray": [.05, 2]
            }
          })
          counter++;
        })
      })

      let ctx = this;
      this.locationInterval = setInterval(() => {
        axios.get(`http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=rutgers&t=0&r=${tag}`)
          .then((res) => {
            let buses = []
            console.log("-----------------------------")
            res.data.vehicle.forEach((bus) => {
              console.log([bus.lon, bus.lat]);
              var el = document.createElement('div');
              var child = document.createElement('div');
              var child2 = document.createElement('div');
              el.className = 'parent';
              child.className = 'marker';
              child2.className = 'marker2';
              el.appendChild(child)
              el.appendChild(child2)
              let marker = new mapboxgl.Marker(el).setLngLat([bus.lon, bus.lat]).addTo(ctx.map)
              buses.push(marker)
            })
            ctx.buses.forEach((marker) => {
              marker.remove()
            })
            ctx.buses = buses
          })
      }, 6000);

    })


    this.map.on('load', () => {
      if (this.$route.params.id != null) {
        if (this.basePath == "stops") {
          const stop = this.stop;
          this.currentMarker = new mapboxgl.Marker({ color: "red" }).setLngLat(stop.location)
          this.currentMarker.addTo(this.map);
          this.map.flyTo({
            center: stop.location
          });
        }
      }
    })
    */
  },
  methods: {
    getStop(tag) {
      return this.$store.getters.stop(tag)
    },
    initialize() {
      const mapboxgl = require('mapbox-gl')
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbS1waXppYWsiLCJhIjoiY2poa3gxeGw2Mnl2YTNibjNpdmkwM2t6cCJ9.oST8MV_wyXjmfOY4IPH1JA';
      const mapview = new mapboxgl.Map({
        container: 'map',
        //style: 'mapbox://styles/adam-piziak/cjhqcs8sx1rfa2rpe0gw3pyjh',
        style: 'https://maps.tilehosting.com/styles/basic/style.json?key=K7rAuvC67gIS7xy6bcOa',
        center: this.stop ? this.stop.location : [-74.447672, 40.502281],
        zoom: 16,
      });
      this.map = mapview
      this.map.on('load', () => {
          this.loaded = true
      })
    }
  },
  computed: {
    basePath() {
      if (this.$route.path.indexOf('stops') !== -1) {
        return "stops"
      }
      return "routes"
    },
    id() {
      return this.$route.params.id
    },
    stop() {
      if (this.basePath === "stops") {
        return this.$store.getters.stop(this.$route.params.id)
      }
      return null
    },
    vue_loaded() {
      return this.$store.state.mounted
    }
  }
}
</script>

<style lang="sass">
#map-view
  position: absolute
  left: 500px
  overflow: hidden
  top: 0
  width: calc(100vw - 500px)
  height: 100vh
  z-index: 0

  &:hover
    cursor: pointer !important

#map
  height: 100vh
  position: relative
  z-index: 10
.marker
  position: absolute
  background: blue
  background-size: cover
  width: 20px
  height: 20px
  margin-left: -10px
  margin-top: -10px
  cursor: pointer
  animation: pulse 2s infinite ease-out
  border-radius: 50%

.marker2
  position: absolute
  background: blue
  background-size: cover
  width: 16px
  height: 16px
  margin-left: -8px
  margin-top: -8px
  cursor: pointer
  border-radius: 50%
  transform: scale(.6)
  background: #373fa8

@keyframes pulse
  0%
    transform: scale(0)
    opacity: 1
  100%
    transform: scale(1.4)
    opacity: 0

.loading
  height: 100vh
  width: 100%
  position: absolute
  z-index: 20
  overflow: hidden
  transition: opacity .3s ease-in
  background: white
  border: 1px solid red

  &.loaded
    opacity: 0

    .slider
      background: white
      transition: .3s


.box
  width: 150px
  position: absolute
  top: 45%
  left: 50%
  transform: translateX(-50%)
  position: relative

.map-label
  color: red
  padding: 5px
.dots
  position: absolute
  display: inline-block
  margin-left: 32px
.dot
  display: inline-block
  height: 8px
  width: 8px
  border-radius: 4px
  background: red
  animation: slide 1.6s linear infinite

  &:not(:first-child)
    margin-left: 10px

  &:first-child
    animation-delay: -.1s

  &:last-child
    animation-delay: .1s
@keyframes slide
  0%, 100%
    transform: scale(0)
  20%
    transform: scale(1.5)
  30%
    transform: scale(.7)
  40%, 80%
    transform: scale(1)
</style>
