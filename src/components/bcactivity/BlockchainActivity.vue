<template>
  <vuestic-widget header-text="Blockchain activity">

    <center v-if="!loaded">
      <atom-spinner color="#4ae387" class="text-center"></atom-spinner>
    </center>

    <div v-else>
      <ul>
        <li v-for="t in transactions" >
          <h6>{{t.time | moment("HH:mm DD/MM/YYYY")}}</h6>
          <h6 style=" width: auto;word-break: break-all;color:#4ae387; ">{{t.blockHash}}</h6>
        </li>
      </ul>
    </div>



  </vuestic-widget>

</template>

<script>

  /*eslint-disable*/
  import VuesticWidget from "../../vuestic-theme/vuestic-components/vuestic-widget/VuesticWidget";
  import VuesticFeed from "../../vuestic-theme/vuestic-components/vuestic-feed/VuesticFeed";
  import SpringSpinner from "epic-spinners/src/components/lib/SpringSpinner";
  import AtomSpinner from "epic-spinners/src/components/lib/AtomSpinner";
  import axios from 'axios'
  import Vue from "vue"
  Vue.use(require('vue-moment'));
  export default {
    name: 'blockchain-activity',
    components: {SpringSpinner, VuesticFeed, VuesticWidget, AtomSpinner},

    mounted: function()  {

      this.getTransactions((data)=>{
          this.transactions = data;
          this.loaded = true;

        })

    },
    data() {
      return {
        loaded: false,
        transactions:[]
      }
    },
    methods: {
      getTransactions: (callback) => {

        axios
          .get("http://localhost:1000/api/lands/AllTransaction")
          .then(resp => {
            console.log(resp.data);
            callback(resp.data)
          })
          .catch(err => {
            this.loaded = true;
            console.log(err);
          });
      }
    }
  }
</script>

