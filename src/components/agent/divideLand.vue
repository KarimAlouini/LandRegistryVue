<!-- eslint-disable -->
<template>

  <div class="dashboard">
    <div class="row">
      <div class="col-xl-7 col-lg-12">
        <vuestic-widget class="widget-viewport-height" header-text="Land View">
    <div class="Map" :id="mapName">
    </div>
        </vuestic-widget>

      </div>
      <div class="col-xl-5 col-lg-12">


        <vuestic-widget header-text="Divide Form">
          <div class="row">
            <div class="col-md-6 ">
              <label class="pull-left required"> Add children </label>
            </div>
            <div class="col-md-6 sc_button sc_button_style_dark sc_button_size_huge squareButton dark huge">
              <button @click="addLand" class="btn btn-sm btn-primary btn-with-icon rounded-icon">
                <span aria-hidden="true" class="center-a glyphicon glyphicon-plus" style="font-size: 20px;"></span>
              </button>
            </div>
          </div>
    <div class="sc_contact_form sc_contact_form_contact" v-if="land.dividable">
      <fieldset v-for="(land,index) in lands">
        <legend>Land {{index+1}}</legend>
        <div class="row">
          <div class="col-md-6 ">
            <label class="pull-left required"> Add Pins </label>
          </div>
          <div class="col-md-6 sc_button sc_button_style_dark sc_button_size_huge squareButton dark huge">
            <button @click="addPin(index)" class="btn btn-sm btn-primary btn-with-icon rounded-icon">
              <span aria-hidden="true" class="center-a glyphicon glyphicon-plus" style="font-size: 20px;"></span>
            </button>
          </div>
        </div>
        <a class="submit" >Add pin</a>
        <fieldset v-for="(pin,index2) in lands[index].pins">
          <legend>Pin number {{index2+1}}</legend>
          <center>
          <div class="form-group">
            <div class="input-group">
              <input id="longitude" v-model.number="lands[index].pins[index2].longitude">
              <label class="control-label" for="longitude">Longitude</label><i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input id="latitude"  v-model.number="lands[index].pins[index2].latitude">
              <label class="control-label" for="latitude">Latitude</label><i class="bar"></i>
            </div>
          </div>
          </center>
          <center>
          <div class="col-md-4 form-group">
            <div class="sc_button sc_button_style_global sc_button_size_huge squareButton global huge">
              <button class="btn btn-danger btn-with-icon rounded-icon " @click="deletePin(index)">
                <span aria-hidden="true" class="center-a glyphicon glyphicon-minus" style="font-size: 20px;"></span>
              </button>
            </div>
          </div>
          </center>
        </fieldset>

      </fieldset>


    </div>
    <br> <br>
    <div class="sc_button sc_button_style_global sc_button_size_huge squareButton global huge">
      <center>
      <button class=" btn btn-primary" type="submit" @click="divide">
        Divide
      </button>
      </center>
    </div>
        </vuestic-widget>

      </div>

    </div>
  </div>
</template>
<script>
  import LandsServices from '../../services/LandsServices'
  import async from 'async'

  var randomColor = require('randomcolor') // import the script

  export default {
    /* eslint-disable */
    name: 'Map',
    props: ['name'],
    data() {
      return {
        lands: [],
        inputs: [],
        longitude: '',
        latitude: '',
        mapName: this.name + "-map",
        land: {},
        loaded: false,

      };
    },

    mounted: function () {

      console.log('here');
      this.getLand()

      const element = document.getElementById(this.mapName)
      const options = {
        zoom: 8,
        center: {lat: 36.883329, lng: 10.274580},
        mapTypeId: 'terrain'
      }

      const map = new google.maps.Map(element, options);


    },
    methods: {
      async divide() {
        console.log('clicked');
        await LandsServices.divideLand({
          id: this.$route.params.id,
          body: {
            children:this.lands
          }
        }).then((data) => {
          console.log(data);
        })
          .catch(error => {
            console.log(error);
          });

        this.$router.push({name: 'listLands'})
      },
      smoothZoom: function smoothZoom(map, max, cnt) {
        if (cnt >= max) {
          return;
        }
        else {
          z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
          });
          setTimeout(function () {
            map.setZoom(cnt)
          }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
        }
      },
      addRow: function addRow() {
        this.Land.children.pins.push({
          longitude: 0,
          latitude: 0
        });
        this.inputs.push({});
      },
      deleteRow: function deleteRow(index) {
        this.inputs.splice(index, 1);
        this.Land.children.pins.splice(index, 1);
      },
      getPolygonBounds(polygon) {

      },
      getLand() {

        console.log(this.$route.params.id);
        LandsServices.getLand({
          id: this.$route.params.id
        })
          .then((data) => {
            console.log(data);
            setTimeout(() => {
              console.log(data.data);
              console.log(data.data);
              this.land = data.data;
              console.log('call done');
              this.SearchLAnd();
            }, 1300);


          })
          .catch((error) => {
            console.log(error);

          });


      },
      drawChildren: function (count, children, map) {
        console.log(count);
        if (count < 0)
          return;
        else {


          var coordinates = [];
          async.forEachOf(children[count].pins, (p) => {
            coordinates.push({
              lat: p.latitude,
              lng: p.longitude
            });

          });


          let xx = new google.maps.Polygon({
            paths: coordinates,
            strokeColor: randomColor(),
            strokeOpacity: 1,
            strokeWeight: 4,
            fillColor: randomColor(),
            fillOpacity: 0.5
          });


          setTimeout(() => {
            xx.setMap(map)
            // console.log('draw '+count);
            this.drawChildren(count - 1, children, map);
          }, 500);


        }

      },
      SearchLAnd: function SearchLAnd() {

        const element = document.getElementById(this.mapName)
        const options = {
          zoom: 16,
          mapTypeId: 'satellite'
        }
        const map = new google.maps.Map(element, options);

        var panPoint = new google.maps.LatLng(this.land.pins[0].latitude, this.land.pins[0].longitude);
        map.panTo(panPoint)
        this.smoothZoom(map, 12, 16);
        google.maps.event.addDomListener(window, 'load', SearchLAnd);
        var cords = [];


        async.forEachOf(this.land.pins, (c) => {
          cords.push({
            lat: c.latitude,
            lng: c.longitude
          });
          if (cords.length === this.land.pins.length) {

            setTimeout(() => {
              var Land = new google.maps.Polygon({
                paths: cords,
                strokeColor: '#1ABC9C',
                strokeOpacity: 1,
                strokeWeight: 4,
                fillColor: '#1ABC9C',
                fillOpacity: 0.5
              });
              Land.setMap(map);


            }, 100);

          }
        });


        var i = 0;
        async.forEachOf(this.land.children, (c) => {

          async.forEachOf(c.pins, (p) => {

          });
          i++;
        });


        this.drawChildren((this.land.children.length - 1), this.land.children, map);

        console.log(this.land.children)


        /* var DevidedLand1 = new google.maps.Polygon({
           paths: LandDevideCoords,
           strokeColor: '#FF0000',
           strokeOpacity: 1,
           strokeWeight: 0,
           fillColor: '#FF0000',
           fillOpacity: 0.5
         });
         var LandCoords = [
           {lat: 36.883122, lng: 10.275705},
           {lat: 36.884238, lng: 10.274935},
           {lat: 36.883754, lng: 10.274063},
           {lat: 36.883899, lng: 10.273913},
           {lat: 36.883924, lng: 10.273795},
           {lat: 36.883730, lng: 10.273430},
           {lat: 36.882167, lng: 10.274556},
           {lat: 36.883122, lng: 10.275705},
         ];*/


      },
      addLand: function () {
        console.log('clicked');
        this.lands.push({
          pins: []
        })
      },
      addPin: function (index) {
        this.lands[index].pins.push({
          longitude: 0,
          latitude: 0
        })
      }
      ,
      deletePin: function deletePin(index) {
        this.inputs.splice(index, 1);
        this.lands[index].pins.splice(index, 1);
      }
    }

  };


</script>
<style scoped>
  .Map {
    width: 600px;
    height: 500px;
    margin: 0 auto;
    background: gray;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .btn-glyphicon {
    padding: 8px;
    background: #ffffff;
    margin-right: 4px;
  }

  .icon-btn {
    padding: 1px 15px 3px 2px;
    border-radius: 50px;
  }

  .upload-box .btn-file {
    background-color: #1e90ff;
  }

  .upload-box .hold {
    float: left;
    width: 100%;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 4px;
  }

  .upload-box .hold a {
    font: 400 14px/36px "Roboto", sans-serif;
    color: #666;
    text-decoration: none;
  }

  .upload-box .btn-file {
    position: relative;
    overflow: hidden;
    float: left;
    padding: 12px 20px;
    font: 900 14px/14px "Roboto", sans-serif;
    color: #fff;
    margin: 0 10px 0 0;
    text-transform: uppercase;
    border-radius: 3px;
    cursor: pointer;
  }

  .upload-box .btn-file input[type="file"] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    opacity: 0;
    outline: none;
    background: #fd0707;
    cursor: inherit;
    display: block;
  }

  .well {
    padding: 5%;
  }

  .checkbox label:after,
  .radio label:after {
    content: '';
    display: table;
    clear: both;
    text-align: center;
    font-size: 12px;
  }

  .checkbox .cr,
  .radio .cr {
    position: relative;
    display: inline-block;
    border: 1px solid #a9a9a9;
    border-radius: .25em;
    width: 1.3em;
    height: 1.3em;
    float: left;
    margin-right: .5em;
  }

  .radio .cr {
    border-radius: 50%;
  }

  .checkbox .cr .cr-icon,
  .radio .cr .cr-icon {
    position: absolute;
    font-size: .8em;
    line-height: 0;
    top: 50%;
    left: 20%;
  }

  .radio .cr .cr-icon {
    margin-left: 0.04em;
  }

  .checkbox label input[type="checkbox"],
  .radio label input[type="radio"] {
    display: none;
  }

  .checkbox label input[type="checkbox"] + .cr > .cr-icon,
  .radio label input[type="radio"] + .cr > .cr-icon {
    transform: scale(3) rotateZ(-20deg);
    opacity: 0;
    transition: all .3s ease-in;
  }

  .checkbox label input[type="checkbox"]:checked + .cr > .cr-icon,
  .radio label input[type="radio"]:checked + .cr > .cr-icon {
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
  }

  .checkbox label input[type="checkbox"]:disabled + .cr,
  .radio label input[type="radio"]:disabled + .cr {
    opacity: .5;
  }

  .checkbox label, .radio label {
    padding-left: 0;
  }

  .checkbox {
    font-size: 22px;
    margin-bottom: 2%;
    margin-top: 2%;
  }

  .submit {
    margin-top: 10%;
  }
</style>
