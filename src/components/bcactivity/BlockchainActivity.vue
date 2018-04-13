<template>
  <vuestic-widget header-text="Blockchain activity">

    <center v-if="!loaded">
      <atom-spinner color="#4ae387" class="text-center"></atom-spinner>
    </center>

    <div v-else>
      <div v-for="(t,index) in transactions" >

        <h6 style="color:#4ae387 ">{{t.time | moment("HH:mm DD/MM/YYYY")}}</h6>
        <a :href="'https://ropsten.etherscan.io/tx/'+t.blockHash" target="_blank"><h6
          style=" width: auto;word-break: break-all;color:#34495e;font-size: 12px ">{{t.blockHash}}</h6></a>

        <hr>
      </div>

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

    mounted: function () {

      this.getTransactions((data) => {
        this.transactions = data;
        this.loaded = true;

      })

    },
    data() {
      return {
        loaded: false,
        transactions: []
      }
    },
    methods: {
      getTransactions: (callback) => {

        axios
          .get("http://localhost:1000/api/lands/AllTransaction")
          .then(resp => {
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

<style lang="scss">
  @import "../../sass/variables";

  .vuestic-feed {
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .empty {
      text-align: center;
    }
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .photo-container {
        margin-right: 1rem;
        border-radius: 50%;
        border: 2px solid $lighter-gray;
        .photo {
          background-size: cover !important;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
      }
      .underscored {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: $light-gray2 2px solid;
        overflow: hidden;
        padding-right: 0.7rem;
        height: 3.5rem;
        .text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .name {
            font-weight: $font-weight-bold;
          }
        }
        .close-btn {
          margin-left: 1rem;
          i {
            left: 10.5px;
          }
        }
      }
      &.last {
        .underscored {
          border-bottom: none;
        }
      }
    }
  }
</style>


