<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Users">
          <atom-spinner v-if="!loaded" color="#4ae387" class="text-center"></atom-spinner>
          <div v-else class="table-responsive">
            <table class="table table-striped table-sm color-icon-label-table">
              <thead>
              <tr>
                <td>Index</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td >Wallet Address</td>
                <td >CIN</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user_alias,index) in User" :key="user_alias.id">
                <td>{{ index+1 }}</td>
                <td>{{ user_alias.fName }}</td>
                <td>{{ user_alias.lName }}</td>
                <td>{{ user_alias.email}}</td>
                <td>{{ user_alias.blockchainAddress }}</td>
                <td>{{ user_alias.idCard }}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <router-link to="/agent/addUser">
            <button class=" btn btn-primary">
              Add User
            </button>
          </router-link>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from "axios"
  import AtomSpinner from "epic-spinners/src/components/lib/AtomSpinner";

  export default {
    components: {AtomSpinner},
    name: "list-user",
  data() {
    return {
      User: [],
      loaded:false
    };
  },
  mounted() {
    axios
      .get("http://localhost:1000/api/agent/listUser")
      .then(response => {
        console.log(response.data);
        this.User = response.data;
        this.loaded = true;
      })
      .catch(error => {
        console.log(error);
      });
  }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";
  atom-spinner{
    color:$vue-green;
  }
</style>
