<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-6">
        <vuestic-widget class="widget-viewport-height" header-text="Land localisation">
          <google-map :show-markers="false"></google-map>
        </vuestic-widget>

      </div>

      <div class="col-md-6 widget-viewport-height">

        <vuestic-widget header-text="Land information">


          <div v-if="!loading">
            <ul>
              <li><h6>Address : {{land.info.number}} , {{land.info.localization.street}} th ,
                {{land.info.localization.city}} [{{land.info.localization.zipCode}}]</h6></li>
              <li><h6>Area : {{land.info.area}}</h6></li>
              <li><h6>Owner :{{land.owner.fName}} {{land.owner.lName}}</h6></li>
            </ul>
            <center v-if="isAuth">
              <button class="btn btn-primary btn-lg">Ask to buy</button>
            </center>


          </div>


          <center v-else>
            <atom-spinner color="#4ae387" class="text-center"></atom-spinner>
          </center>


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
  import VuesticTabs from "../../vuestic-theme/vuestic-components/vuestic-tabs/VuesticTabs";
  import DataVisualisationTab from "../dashboard/data-visualisation-tab/DataVisualisation";
  import AtomSpinner from "epic-spinners/src/components/lib/AtomSpinner";


  export default {
    name: 'dashboard',
    components: {
      AtomSpinner,
      GoogleMap,
      DataVisualisationTab,
      VuesticWidget,
      VuesticTabs

    }, data() {
      return {
        breadcrumbs: ['Home'],
        names: [
          'Localization',
          'History',
          'Documents',
          'Owner info'
        ],
        land: null,
        loading: true
      }
    },
    mounted: function () {

      this.getLand();


    },
    methods: {
      getLand() {

        axios.get('http://localhost:1000/api/geocoder/landfromcache/' + this.$route.params.id)
          .then((response) => {

            this.land = response.data;
            axios.get('http://localhost:1000/api/users/info/' + response.data.info.owner).then((res) => {
              this.land.owner = res.data;
              this.loading = false;
            }).catch();
            this.$root.$emit('drawLands', [this.land]);
            this.$root.$emit('panToLand', this.land);

          })
          .catch((err) => {
            console.log(err);
          });
      },

    },
    computed: {
      isAuth() {
        if (localStorage.getItem('token') == null)
          return false;
        else return true;

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";
</style>
