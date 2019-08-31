<template lang="pug">
  section#map-view
    #map
</template>

<script>
import EventManager from '@/event-bus.js';
import axios from 'axios';
import Vue from 'vue';
import api from '@/api'
import BusMarker from 'components/BusMarker'
import StopMarker from 'components/StopMarker'
let mapboxgl

class Vehicle {
  constructor(id, marker) {
    this.id = id
    this.marker = marker
  }

  getID() {
    return this.id
  }

  getMarker() {
    return this.marker
  }

  remove() {
    this.marker.remove()
  }

  updateLocation(newLocation) {
    this.marker.setLngLat(newLocation)
  }
}

export default {
  data() {
    return {
      map: null,
      counter: 0,
      stopMarker: null,
      vehicles: [],
      layers: [],
      routeStopMarkers: [],
      locationInterval: null,
      vehicleInterval: null,
      loaded: false
    }
  },
  components: { BusMarker, StopMarker },
  mounted() {
    mapboxgl = require('mapbox-gl')
    // Initalize keys and load map
    this.initialize()

    // Once map loads, resume the current view
    this.map.on('style.load', () => this.resumeView())

    // If stop view is requested, sync the current view with the stop
    EventManager.$on('GO_TO_STOP', id => this.syncViewWithStop(id))

    // On route request, display route
    EventManager.$on('GO_TO_ROUTE', (id) => this.displayRoute(id))

    //
    EventManager.$on('CLEAR_MAP', () => this.clearView())

    this.resumeView()
  },
  methods: {
    resumeView() {
      if (this.$route.params.id != null) {
        if (this.basePath == "stops") {
          const stop = this.stop;
          this.currentMarker = new mapboxgl.Marker({ color: "red" }).setLngLat(stop.location[1], stop.location[0])
          this.currentMarker.addTo(this.map)
          this.map.flyTo({
            center: stop.location
          })
        } else if (this.basePath == "routes") {
          if (this.route) {
            this.displayRoute(this.route.id)
          }
        }
      }
    },
    displayRoute(id) {
      this.clearView()

      // Get current route data
      const route = this.getRoute(id)

      // Display route segments
      let geojson = this.createGeoJSON()
      route.segments.forEach((segment) => {
        let coordinates = segment.map(x => [x[1], x[0]])
        geojson.source.data.features.push(this.createSegment(coordinates));
      })

      this.map.addLayer(geojson);

      // Display stops
      let n = 0
      this.routeStopMarkers = []
      route.stops.forEach((stop, i) => {
        // Add stop marker
        let marker = this.createStopMarker(stop, i+1)
        this.routeStopMarkers[n] = new mapboxgl.Marker(marker).setLngLat(stop.location)
        this.routeStopMarkers[n].addTo(this.map)
        n++
      })


      // fit map to route segment
      let bounds = new mapboxgl.LngLatBounds();
      route.segments.forEach((segment) => {
        segment.map(x => [x[1], x[0]]).forEach((seg) => bounds.extend(seg))
      })
      this.map.fitBounds(bounds, { padding: 100, linear: true });

      // Show route locations
      let ctx = this
      this.vehicleInterval = setInterval(() => {
        api.fetchRouteVehicles(route.id).then((res) => {
          let lastest_vehicle_list = res.data.data.vehicles
          if (!lastest_vehicle_list) return

          // Remove markers for vehicles that don't exist anymore
          ctx.vehicles.filter((vehicle) => {
            if (!lastest_vehicle_list.find(v => v.id === vehicle.getID())) {
              vehicle.remove()
              return false
            }

            return true
          })

          // Add or update vehicles
          lastest_vehicle_list.forEach((vehicle) => {
            // Update if exists
            let existing = ctx.vehicles.find(v => v.getID() == vehicle.id)

            if (existing) {
              ctx.moveMarker(existing.getMarker(), [existing.getMarker().getLngLat().lng, existing.getMarker().getLngLat().lat], vehicle.location, 0)
              //existing.updateLocation(vehicle.location)
            } else {
              let markerHTML = ctx.createVehicleMarker()
              let marker = new mapboxgl.Marker(markerHTML).setLngLat(vehicle.location)
              marker.addTo(ctx.map)
              ctx.vehicles.push(new Vehicle(vehicle.id, marker))
            }
          })




        })
      }, 2000)


    },

    createSegment(coordinates) {
      let feature = {};
      feature.type = "Feature";
      feature.properties = {};
      feature.geometry = {};
      feature.geometry.type = "LineString";
      feature.geometry.coordinates = coordinates;
      return feature
    },
    syncViewWithStop(id) {
      // Remove current view (markers, segments, etc)
      this.clearView()

      // Get current stop data
      const stop = this.getStop(id)

      // Add stop marker
      let marker = this.createStopMarker(stop, -1)
      this.stopMarker = new mapboxgl.Marker(marker).setLngLat(stop.location)
      this.stopMarker.addTo(this.map)

      // Move map into position
      this.map.flyTo({
        center: stop.location,
        zoom: 18
      })
    },
    createStopMarker(stop, i) {
      let StopMarkerClass = Vue.extend(StopMarker)

      let marker = new StopMarkerClass({
        parent: this,
        propsData: { name: stop.name, order: i, id: stop.id}
      })
      marker.$mount()
      return marker.$el
    },
    createVehicleMarker() {
      let BusMarkerClass = Vue.extend(BusMarker)

      let marker = new BusMarkerClass()
      marker.$mount()
      return marker.$el
    },
    clearView() {
      console.log('clearing map')
      if (this.map.getLayer("route-outline")) {
        this.map.removeLayer("route-outline");
      }

      if (this.map.getSource('route-outline')) {
        this.map.removeSource("route-outline");
      }

      if (this.stopMarker != null) {
        this.stopMarker.remove()
        this.stopMarker = null
      }

      this.routeStopMarkers.forEach((m) => {
        m.remove()
      })
      clearInterval(this.vehicleInterval)
      this.vehicles.forEach((vehicle) => {
        vehicle.remove()
      })
      this.vehicles.length = 0
    },
    getStop(id) {
      return this.$store.getters.stop(id)
    },
    getRoute(id) {
      return this.$store.getters.route(id)
    },
    initialize() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbS1waXppYWsiLCJhIjoiY2poa3gxeGw2Mnl2YTNibjNpdmkwM2t6cCJ9.oST8MV_wyXjmfOY4IPH1JA'
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=K7rAuvC67gIS7xy6bcOa',
        center: this.stop ? this.stop.location : [-74.447672, 40.502281],
        zoom: 16,
      })
      this.map = map
      this.map.getCanvas().style.cursor ='default'
    },
    createGeoJSON() {
      let geojson = {}
      geojson.id = "route-outline"
      geojson.type = "line"
      geojson.source = {}
      geojson.source.type = "geojson"
      geojson.source.data = {}
      geojson.source.data.type = "FeatureCollection"
      geojson.source.data.features = []
      geojson.paint = {}
      geojson.paint["line-color"] = "#ff7961"
      geojson.paint["line-width"] = 2
      return geojson
    },
    moveMarker(marker, prevLocation, destLocation, progress) {
      if (progress >= 1) {
          marker.setLngLat(destLocation)
          return
      }
      let distanceX = destLocation[0] - prevLocation[0]
      let distanceY = destLocation[1] - prevLocation[1]

      let easeProgress = this.ease(progress)
      let newLocation = [prevLocation[0] + distanceX *  easeProgress, prevLocation[1] + distanceY * easeProgress]
      marker.setLngLat(newLocation)
      requestAnimationFrame((timestamp) => {
        this.moveMarker(marker, prevLocation, destLocation, progress + 0.02)
      })
    },
    ease(t) {
      return t*(2-t)
    },
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
    route() {
      if (this.basePath === "routes") {
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
  left: 460px
  overflow: hidden
  top: 0
  width: calc(100vw - 460px)
  height: 100vh
  transition: 0.3s
  z-index: 0


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
