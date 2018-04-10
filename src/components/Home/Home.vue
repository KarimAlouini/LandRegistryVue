<template>
  <div class="dashboard">

    <div class="row">
      <div class="col-xl-6 col-lg-12">
        <vuestic-widget class="widget-viewport-height" header-text="Browse for lands">
          <google-map ref="mapComponent"></google-map>
        </vuestic-widget>

      </div>
      <div class="col-xl-6 col-lg-12">


        <vuestic-widget header-text="Browse for lands">
          <vuestic-scrollbar>


            <div v-if="loaded" class="table-responsive">
              <vuestic-feed :initial-posts="lands"></vuestic-feed>
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



  export default {
    name: 'dashboard',
    components: {
      AtomSpinner,
      SpringSpinner, VuesticFeed, ItemsPerPage, FilterBar, VuesticDataTable, GoogleMap, VuesticWidget
    }, data() {
      return {
        breadcrumbs: ['Home'],
        lands: [],
        loaded: false
      }
    },
    mounted: function () {
      this.getLands((data)=>{
        this.lands = data;
        console.log('start');
        setTimeout(()=>{
          this.$refs.mapComponent.drawLands(this.lands,this.$refs.mapComponent.map)
        },2000);
      });

    },
    methods: {
      getLands: function (callback) {
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
