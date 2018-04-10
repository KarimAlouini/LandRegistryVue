<template>
  <div v-show="doneDrawing" class="google-map" id="map">
    <atom-spinner style="margin:0 auto" v-show="!doneDrawing" color="#4ae387" class="text-center"></atom-spinner>
  </div>
</template>

<script>
  /*eslint-disable*/
  import {mapGetters} from 'vuex'
  import * as GoogleMapsLoader from 'google-maps'
  import async from 'async'
  import randomColor from 'randomcolor'
  import mapsUtil from '../../../util/mapsUtil'
  import AtomSpinner from "epic-spinners/src/components/lib/AtomSpinner";


  export default {
    name: 'google-map',
    components: {AtomSpinner},
    data() {
      return {
        doneDrawing: false
      }
    },
    computed: mapGetters({
      config: 'config'
    }),
    mounted() {
      GoogleMapsLoader.KEY = this.config.googleMaps.apiKey
      var ref = this;
      GoogleMapsLoader.load((google) => {

        ref.map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(36.883329, 10.274580),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.$root.$on('drawLands', (lands) => {
          this.drawLands(lands, () => {
            this.doneDrawing = true;
            this.$root.$emit('doneDrawing');
          });
        })

      })
    },
    methods: {
      drawLands(lands, callback) {
        async.forEachOf(lands, (land) => {
          var coordinates = [];
          async.forEachOf(land.info.pins, (p, index) => {
            coordinates.push({
              lat: p.latitude,
              lng: p.longitude
            });
          });

          var marker = new google.maps.Marker({
            position: mapsUtil.getBounds(coordinates).getCenter(),
            map: this.map,

          });
          var infowindow = new google.maps.InfoWindow();

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
          google.maps.event.addListener(marker, 'click', (event) => {
            this.map.setZoom(mapsUtil.getBoundsZoomLevel(mapsUtil.getBounds(coordinates), {height: 300, width: 300}))
            this.map.panTo(mapsUtil.getBounds(coordinates).getCenter());
          });
          let color = randomColor();
          let polygon = new google.maps.Polygon({
            paths: coordinates,
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 4,
            fillColor: randomColor(),
            fillOpacity: 0.5
          });
          google.maps.event.addListener(polygon, (e, text) => {
            console.log(e);
            console.log(text);
          });
          polygon.land = land;
          google.maps.event.addListener(polygon, 'click', function (event) {
            console.log(polygon.land);
          });
          polygon.setMap(this.map);
        });

        callback();
      }
    },
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";

  .google-map {
    height: 100%;
  }
</style>
