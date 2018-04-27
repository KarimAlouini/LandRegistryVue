<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Lands">

          <div class="table-responsive">
            <table class="table table-striped table-sm color-icon-label-table">
              <thead>
              <tr>
                <td>Index</td>
                <td>Owner First Name</td>
                <td>Owner Last Name</td>
                <td>Land Address</td>
                <td align="middle">Land Area</td>
                <td align="middle">Action</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(land_alias,index) in Land" :key="land_alias.id">
                <td>{{ index+1 }}</td>
                <td>{{ land_alias.owner.fname }}</td>
                <td>{{ land_alias.owner.lname }}</td>
                <td>{{ land_alias.localization.city }}, {{land_alias.localization.street}},
                  {{land_alias.localization.number}}
                </td>
                <td align="middle">{{ land_alias.area }}</td>
                <td align="middle"><router-link :to="{ name: 'divide', params: { id:land_alias._id}}"><button class="btn btn-micro btn-primary">Devide</button></router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <router-link to="/agent/addLand">
            <button class=" btn btn-primary">
              Add Land
            </button>
          </router-link>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'

  export default {
    name: "list-lands",
    data() {
      return {
        Land: []
      };
    },
    mounted() {
      axios
        .get("http://localhost:1000/api/lands/GetLandsFromCache")
        .then(response => {
          console.log(response.data);
          this.Land = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
</script>

<style scoped>

</style>
