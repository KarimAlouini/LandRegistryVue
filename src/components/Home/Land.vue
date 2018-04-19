<template>
  <div class="dashboard">
    <vuestic-widget class="no-padding no-v-padding">

      <vuestic-tabs :names="names">
        <div :slot="names[0]">
         <google-map :show-markers=false></google-map>
        </div>
        <div :slot="names[1]">
          <data-visualisation-tab></data-visualisation-tab>
        </div>
        <div :slot="names[2]">
          <data-visualisation-tab></data-visualisation-tab>
        </div>
        <div :slot="names[3]">
          <data-visualisation-tab></data-visualisation-tab>
        </div>
      </vuestic-tabs>
    </vuestic-widget>
  </div>

</template>

<script>
  /*eslint-disable*/
  import VuesticWidget from "../../vuestic-theme/vuestic-components/vuestic-widget/VuesticWidget";
  import GoogleMap from "../maps/google-maps/GoogleMap";
  import axios from 'axios'
  import VuesticTabs from "../../vuestic-theme/vuestic-components/vuestic-tabs/VuesticTabs";
  import DataVisualisationTab from "../dashboard/data-visualisation-tab/DataVisualisation";


  export default {
    name: 'dashboard',
    components: {
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
        ]
      }
    },
    mounted: function () {
          axios.get()

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";
</style>
