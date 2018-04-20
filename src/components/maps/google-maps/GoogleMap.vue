<template>
  <div v-show="doneDrawing" class="google-map" id="map" ref="map">
    <atom-spinner style="margin:0 auto" v-show="!doneDrawing" color="#4ae387" class="text-center"></atom-spinner>

    <div ref="window" v-if="land !== null">
      {{land.info.area}} m² @ {{land.info.number}} , {{land.info.localization.street}} th ,
      {{land.info.localization.city}} [{{land.info.localization.zipCode}}]<br><br>
      <center>
       <router-link :to="{ name: 'land', params: { id:land.info._id}}"><button class="btn btn-micro btn-primary">Visit</button></router-link>
      </center>
    </div>


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
        doneDrawing: false,
        land: null,
        showM:true
      }
    },
    computed: mapGetters({
      config: 'config'
    }),
    props:['showMarkers'],
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

      });

      this.$root.$on('panToCity',(value)=>{
        this.map.setZoom(12);
        this.map.panTo(value);
      });
    },
    methods: {
      drawLands(lands, callback) {
        async.forEachOf(lands, (land) => {
          var coordinates = mapsUtil.constructCoordinatesFromLand(land);
          if (this.showMarkers){
            var marker = new google.maps.Marker({
              position: mapsUtil.getBounds(coordinates).getCenter(),
              map: this.map,

            });
            let ref = this;
            google.maps.event.addListener(marker, 'click', (event) => {
              this.land = land;
              setTimeout(() => {
                ref.$refs.map.onclick = () => {
                  infowindow.close();
                };
                var infowindow = new google.maps.InfoWindow({
                  content: ref.$refs.window
                });
                infowindow.open(map, marker);
              }, 100);
              this.map.setZoom(mapsUtil.getBoundsZoomLevel(mapsUtil.getBounds(coordinates), {height: 300, width: 300}))
              this.map.panTo(mapsUtil.getBounds(coordinates).getCenter());
            });
          }
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
