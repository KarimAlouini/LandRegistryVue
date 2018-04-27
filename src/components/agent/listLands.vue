<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Lands">

          <div class="table-responsive">
            <div class="col-md-4 form-group">
              <div class="input-group">
                <input  id="search" type="text" v-model="search" >
                <label class="control-label" for="search">Search Land</label><i class="bar"></i>
              </div>
            </div>
            <table class="table table-striped table-sm color-icon-label-table">
              <thead>
              <tr>
                <td>Index</td>
                <td>Land Address</td>
                <td align="middle">Land Area</td>
                <td align="middle">Action</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(land_alias,index) in filteredLands" :key="land_alias.id">
                <td>{{ index+1 }}</td>
                <td>{{ land_alias.localization.city }}, {{land_alias.localization.street}},
                  {{land_alias.localization.number}}
                </td>
                <td align="middle">{{ land_alias.area }}</td>
                <td align="middle">
                  <router-link :to="{ name: 'divide', params: { id:land_alias._id}}">
                    <button class="btn btn-micro btn-primary">Devide</button>
                  </router-link>
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
        Land: [],
        search: ''
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
    },
    computed: {
      filteredLands: function () {
        return this.Land.filter((land) => {
          return land.localization.city.toLowerCase().match(this.search.toLowerCase())
            || land.localization.street.toLowerCase().match(this.search.toLowerCase());
        });
      }
    }
  }
</script>

<style scoped>

</style>
