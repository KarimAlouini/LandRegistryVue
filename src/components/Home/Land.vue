<template>

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

    }, data() {
        return{
          breadcrumbs: ['Home']
        }
    },
    mounted: function () {


    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";
</style>
