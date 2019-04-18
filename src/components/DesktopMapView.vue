<template lang="pug">
  section#map-view
    #map
</template>

<script>
import EventManager from '@/event-bus.js';
import axios from 'axios';
import Vue from 'vue';
import BusMarker from 'components/BusMarker'
import StopMarker from 'components/StopMarker'
let mapboxgl

export default {
  data() {
    return {
      map: null,
      counter: 0,
      stopMarker: null,
      buses: [],
      layers: [],
      routeStopMarkers: [],
      locationInterval: null,
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
    /*
    this.initialize()
    const mapboxgl = require('mapbox-gl')
    EventBus.$on('GO_TO_STOP', (id) => {
      clearInterval(this.locationInterval)
      let StopMarkerClass = Vue.extend(StopMarker)

      if (this.map.getLayer("route-outline")) {
        this.map.removeLayer("route-outline");
      }

      if (this.map.getSource('route-outline')) {
        this.map.removeSource("route-outline");
      }

      const stop = this.getStop(id)
      this.map.flyTo({
        center: stop.location,
        zoom: 15.5
      });

      this.markers.forEach((m) => {
        m.remove()
      })
      if (this.currentMarker != null) {
        this.currentMarker.remove()
        this.currentMarker = null
      }
      let el = new StopMarkerClass({
        propsData: { name: stop.name, id: stop.id }
      })
      el.$mount()
      this.currentMarker = new mapboxgl.Marker(el.$el).setLngLat(stop.location)
      this.currentMarker.addTo(this.map);
    })

    EventBus.$on('GO_TO_ROUTE', (id) => {
      let ctx = this;
      let StopMarkerClass = Vue.extend(StopMarker)
      const route = this.getRoute(id)
      clearInterval(this.interval);
      this.buses.forEach((marker) => marker.remove());
      axios({
        url: 'https://api.scarletbus.com/graphql',
        method: 'post',
        timeout: 3000,
        data: {
          query: `
            {
              vehicles(id: ${id}) {
                location
              }
            }
          `
        }
      }).then((res) => {
        let buses = res.data.data.vehicles;
        ctx.buses.forEach((marker) => marker.remove());
        let BusMarkerClass = Vue.extend(BusMarker)
        buses.forEach((bus) => {
          let icon = new BusMarkerClass;
          icon.$mount();
          let marker = new mapboxgl.Marker(icon.$el).setLngLat(bus.location).addTo(ctx.map);
          ctx.buses.push(marker);
        })});
      this.interval = setInterval(function () {
        axios({
          url: 'https://api.scarletbus.com/graphql',
          method: 'post',
          timeout: 3000,
          data: {
            query: `
              {
                vehicles(id: ${id}) {
                  location
                }
              }
            `
          }
        }).then((res) => {
          let buses = res.data.data.vehicles;
          ctx.buses.forEach((marker) => marker.remove());
          let BusMarkerClass = Vue.extend(BusMarker)
          buses.forEach((bus) => {
            let icon = new BusMarkerClass();
            icon.$mount();
            let marker = new mapboxgl.Marker(icon.$el).setLngLat(bus.location).addTo(ctx.map);
            ctx.buses.push(marker);
          })
        });
      }, 5000);
      if (this.currentMarker != null) {
        this.currentMarker.remove()
        this.currentMarker = null
      }
      let bounds = new mapboxgl.LngLatBounds();
      route.segments.forEach((segment) => {
        let s = segment.map(x => [x[1], x[0]])
        s.forEach((seg) => bounds.extend(seg))
      })
      this.map.fitBounds(bounds, { padding: 100, linear: true });
      this.locationInterval = setInterval(function () {
        axios.get("https")
      }, 5000);

      this.markers.forEach((m) => {
        m.remove()
      })
      ctx.markers.length = 0;
      setTimeout(() => {
        route.stops.forEach((stop) => {
          if (stop.arrivals) {

            let el = document.createElement('div');
            el.className = 'stop-marker';
            el.style.cursor = "pointer";
            el.addEventListener('click', e => {
              e.stopPropagation();
              ctx.$router.push(`/stops/${stop.id}`)
              EventBus.$emit('GO_TO_STOP', stop.id);
            }, true);
            let icon = new StopMarkerClass({
              parent: ctx,
              propsData: { name: stop.name, id: stop.id }
            });
            icon.$mount();


            let marker = new mapboxgl.Marker(icon.$el).setLngLat(stop.location).addTo(ctx.map);
            ctx.markers.push(marker);
          } else {
            let marker = new mapboxgl.Marker({ color: "gray" }).setLngLat(stop.location)
            ctx.markers.push(marker);
            marker.addTo(ctx.map);
          }
        })
      }, 200);

      setTimeout(function () {


        route.segments.forEach((segment) => {
          let coordinates = segment.map(x => [x[1], x[0]])
          let feature = {};
          feature.type = "Feature";
          feature.properties = {};
          feature.geometry = {};
          feature.geometry.type = "LineString";
          feature.geometry.coordinates = coordinates;


          geojson.source.data.features.push(feature);
        })

        if (ctx.map.getLayer("route-outline")) {
          ctx.map.removeLayer("route-outline");
        }

        if (ctx.map.getSource('route-outline')) {
          ctx.map.removeSource("route-outline");
        }

        ctx.map.addLayer(geojson);
      }, 100);
    })




    */
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
      route.stops.forEach((stop) => {
        // Add stop marker
        let marker = this.createStopMarker(stop)
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
      let marker = this.createStopMarker(stop)
      this.stopMarker = new mapboxgl.Marker(marker).setLngLat(stop.location)
      this.stopMarker.addTo(this.map)

      // Move map into position
      this.map.flyTo({
        center: stop.location,
        zoom: 15.5
      })
    },
    createStopMarker(stop) {
      let StopMarkerClass = Vue.extend(StopMarker)

      let marker = new StopMarkerClass({
        parent: this,
        propsData: { name: stop.name, id: stop.id}
      })
      marker.$mount()
      return marker.$el
    },
    clearView() {
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
        //style: 'mapbox://styles/adam-piziak/cjhqcs8sx1rfa2rpe0gw3pyjh',
        //style: 'mapbox://styles/mapbox/streets-v11',
        style: 'https://maps.tilehosting.com/styles/basic/style.json?key=K7rAuvC67gIS7xy6bcOa',
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
      geojson.paint["line-color"] = "#dd511e"
      geojson.paint["line-width"] = 2
      return geojson
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
  left: 460px
  overflow: hidden
  top: 0
  width: calc(100vw - 460px)
  height: 100vh
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
