<template>
  <div class="dashboard">

    <div class="row">
      <div class="col-xl-7 col-lg-12">
        <vuestic-widget class="widget-viewport-height" header-text="Browse for lands">
          <google-map>
            <h1>hello</h1>
          </google-map>
        </vuestic-widget>

      </div>
      <div class="col-xl-5 col-lg-12">


        <vuestic-widget header-text="Browse for lands">
          <vuestic-scrollbar>


            <div v-if="loaded" class="table-responsive">
              <land-list-home :landslist="this.lands"></land-list-home>
            </div>
            <center v-else>
              <atom-spinner color="#4ae387" class="text-center"></atom-spinner>
            </center>
          </vuestic-scrollbar>
        </vuestic-widget>

      </div>
    </div>

  </div>
</template>

<script>
  /*eslint-disable*/
  import VuesticWidget from "../../vuestic-theme/vuestic-components/vuestic-widget/VuesticWidget";
  import GoogleMap from "../maps/google-maps/GoogleMap";
  import axios from 'axios'
  import VuesticDataTable from "../../vuestic-theme/vuestic-components/vuestic-datatable/VuesticDataTable";
  import FilterBar from "../../vuestic-theme/vuestic-components/vuestic-datatable/datatable-components/FilterBar";
  import ItemsPerPage from "../../vuestic-theme/vuestic-components/vuestic-datatable/datatable-components/ItemsPerPage";
  import VuesticFeed from "../../vuestic-theme/vuestic-components/vuestic-feed/VuesticFeed";
  import SpringSpinner from "epic-spinners/src/components/lib/SpringSpinner";
  import AtomSpinner from "epic-spinners/src/components/lib/AtomSpinner";
  import LandListHome from "./LandList";


  export default {
    name: 'dashboard',
    components: {
      LandListHome,
      AtomSpinner,
      SpringSpinner, VuesticFeed, ItemsPerPage, FilterBar, VuesticDataTable, GoogleMap, VuesticWidget
    }, data() {
      return {

        lands: [],
        loaded: false,
        loadedMap: false
      }
    },
    mounted: function () {

      this.$root.$on('loadedMap', () => {
        // this.loadedMap = true;
      });
      this.$root.$on('doneDrawing', () => {
        console.log('done drawing');
        setTimeout(() => {
          console.log('loaded is true');
          this.loadedMap = true;
        }, 10000)
      });

      this.getLands((data) => {
        console.log('getlands');
        this.lands = data;
        //this.$refs.mapComponent.drawLands(this.lands)
        this.$root.$emit('drawLands', this.lands);


      });

    },
    methods: {
      getLands(callback) {
        axios
          .get("http://localhost:1000/api/geocoder/")
          .then(response => {
            this.loaded = true;
            callback(response.data);

          })
          .catch(error => {
            console.log(error);
          });

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";
</style>
