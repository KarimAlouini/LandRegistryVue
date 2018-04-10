<template>
  <div class="google-map" id="map">
  </div>
</template>

<script>
  /*eslint-disable*/
  import {mapGetters} from 'vuex'
  import * as GoogleMapsLoader from 'google-maps'
  import async from 'async'
  import randomColor from 'randomcolor'

  export default {
    name: 'google-map',

    computed: mapGetters({
      config: 'config'
    }),
    data() {
      return{
        map:'hahaha'
    }
  }
  ,

  mounted()
  {
    GoogleMapsLoader.KEY = this.config.googleMaps.apiKey

    var ref = this;
    GoogleMapsLoader.load((google) => {

    ref.map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(36.883329, 10.274580),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      })


    })
  }
  ,
  methods:{
    drawLands:(lands,map) => {
      console.log(map);
      async.forEachOf(lands, (land) => {
        var coordinates = [];
        async.forEachOf(land.info.pins, (p) => {

          //draw pin
          coordinates.push({
            lat: p.latitude,
            lng: p.longitude
          });

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
        console.log('draw');
        google.maps.event.addListener(polygon,(e,text)=>{
          console.log('here');
          console.log(e);
          console.log(text);
        });
        polygon.land = land;
        google.maps.event.addListener(polygon, 'click', function (event) {
          console.log(polygon.land);
        });

        polygon.setMap(map);



      });
    }
  }

  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";

  .google-map {
    height: 100%;
  }
</style>
