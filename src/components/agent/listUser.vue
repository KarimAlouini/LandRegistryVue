<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Users">
          <atom-spinner v-if="!loaded" color="#4ae387" class="text-center"></atom-spinner>
          <div v-else class="table-responsive">
            <div class="col-md-4 form-group">
              <div class="input-group">
                <input  id="search" type="text" v-model="search" >
                <label class="control-label" for="search">Search user</label><i class="bar"></i>
              </div>
            </div>
            <table class="table table-striped table-sm color-icon-label-table">
              <thead>
              <tr>
                <th>Index</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Wallet Address</th>
                <th>CIN</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user,index) in filteredUsers" :key="user.id">
                <td>{{ index+1 }}</td>
                <td>{{ user.fName }}</td>
                <td>{{ user.lName }}</td>
                <td>{{ user.email}}</td>
                <td>{{ user.blockchainAddress }}</td>
                <td>{{ user.idCard }}</td>
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
        loaded: false,
        search: ''
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
    },
    computed: {
      filteredUsers: function () {
        return this.User.filter((user) => {
          return user.fName.toLowerCase().match(this.search.toLowerCase())
            ||user.lName.toLowerCase().match(this.search.toLowerCase())
            ||user.email.toLowerCase().match(this.search.toLowerCase());
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  atom-spinner {
    color: $vue-green;
  }
</style>
