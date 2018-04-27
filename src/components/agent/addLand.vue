<template>
  <div class="form-elements">
    <div v-if="!validation" class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Add New Land">
          <form @submit="checkForm" method="post">
            <div v-if="err.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in err">{{ error }}</li>
              </ul>
            </div>

            <div class="row">
              <div class="col-md-12 form-group">
                <div class="input-group">
                  <input required id="owner" v-model="Land.owner"/>
                  <label class="control-label" for="owner">Owner</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 form-group">
                <div class="input-group">
                  <input id="city" required v-model="Land.localization.city"/>
                  <label class="control-label" for="city">City</label><i class="bar"></i>
                </div>
              </div>
              <div class="col-md-3 form-group">
                <div class="input-group">
                  <input id="street" required v-model="Land.localization.street"/>
                  <label class="control-label" for="street">Street</label><i class="bar"></i>
                </div>
              </div>
              <div class="col-md-3 form-group">
                <div class="input-group">
                  <input type="number" id="number" required v-model="Land.localization.number"/>
                  <label class="control-label" for="number">Land Number</label><i class="bar"></i>
                </div>
              </div>
              <div class="col-md-3 form-group">
                <div class="input-group">
                  <input type="number"  id="zipcode" v-model="Land.localization.zipCode" required/>
                  <label class="control-label" for="zipcode">Zip Code</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 form-group">
                <div class="input-group">
                  <input required id="area" type="number" v-model.number="Land.area"/>
                  <label class="control-label" for="area">Area</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 ">
                <label class="pull-left required"> Pins </label>
              </div>
              <div class="col-md-6 sc_button sc_button_style_dark sc_button_size_huge squareButton dark huge">
                <input type="button" @click="addRow" class="btn btn-sm btn-primary  btn-micro" value="Add">
              </div>
            </div>
            <div class="row" v-for="(input,index) in inputs" :key="index">

              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="longitude" type='number' v-model.number="Land.pins[index].longitude">
                  <label class="control-label" for="longitude">Longitude</label><i class="bar"></i>
                </div>
              </div>
              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="latitude" type='number' v-model.number="Land.pins[index].latitude">
                  <label class="control-label" for="latitude">Latitude</label><i class="bar"></i>
                </div>
              </div>
              <div class="col-md-4 form-group">
                <div class="sc_button sc_button_style_global sc_button_size_huge squareButton global huge">
                  <input class="btn btn-sm btn-danger btn-micro " @click="deleteRow(index) " value="Delete">
                </div>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-md-6 offset-md-6 vuestic-checkbox form-check abc-checkbox abc-checkbox-primary">
                <div class="input-group">
                  <input type="checkbox" id="checkbox1" name="" class="form-check-input" v-model="Land.dividable">
                  <label for="checkbox1" class="form-check-label">
                    <span class="abc-label-text">Dividable</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div v-for="f in files">
                <h6> {{f.name}},
                </h6><br>
              </div>
              <div class="col-md-10 offset-md-1 form-group">


                <b-form-file multiple v-model="file" @change="loadFile($event)"
                             placeholder="Choose a file..."></b-form-file>
              </div>

            </div>
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-4"></div>
              <div class="col-md-4 ">
                <div class="row">
                  <div class="col-md-6  offset-md-3">
                    <button  class=" btn btn-primary" @submit.prevent="checkForm($event)">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </vuestic-widget>
      </div>
    </div>
    <div v-if="validation" class="row">
      <div class="col-md-12">
        <vuestic-widget>
          <div class="col-md-6 offset-md-3 table-responsive">
            <h3 style="text-align: center">Validation</h3>
            <table class="table table-striped first-td-padding">
              <tbody>
              <tr>
                <td class="label">Owner:</td>
                <td>{{Land.owner}}</td>
              </tr>
              <tr>
                <td class="label">City:</td>
                <td>{{Land.localization.city}}</td>
              </tr>
              <tr>
                <td class="label">Street:</td>
                <td>{{Land.localization.street}}</td>
              </tr>
              <tr>
                <td class="label">Land Number:</td>
                <td>{{Land.localization.number}}</td>
              </tr>
              <tr>
                <td class="label">Zip Code:</td>
                <td>{{Land.localization.zipCode}}</td>
              </tr>
              <tr>
                <td class="label">Area:</td>
                <td>{{Land.area}}</td>
              </tr>
              <tr>
                <td class="label">Dividable:</td>
                <td>{{Land.dividable}}</td>
              </tr>
              </tbody>
            </table>
            <div class="row">
              <div class="center-a">
                <button class=" btn btn-danger" @click="validation=false">
                  Undo
                </button>
                  <button class=" btn btn-primary" @click="addToAPI">
                    Validate
                  </button>
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import async from 'async'
  /* eslint-disable */
  export default {
    name: "add-land",
    data() {
      return {
        Land: {
          owner: "",
          localization: {
            street: "",
            city: "",
            number: 0,
            zipCode: 0
          },
          pins: [],
          dividable: ""
        },
        inputs: [],
        err: [],
        files: [],
        file: null,
        validation: false
      };
    },
    methods: {
      addToAPI() {
        var formData = new FormData();
        const len = this.files.length;
        formData.append("land", JSON.stringify(this.Land));
        formData.append("docCount", this.files.length);

        for (let i = 0; i < len; i++) {
          formData.append("file" + i, this.files[i]);
        }
        console.log(this.Land);
        console.log(JSON.stringify(this.Land));
        axios
          .post(
            "http://localhost:1000/api/agent/add",

            formData,
            {
              headers: {
                accept: "application/json",
                "accept-language": "en_US",
                "Content-Type": `multipart/form-data; boundary=${
                  formData._boundary
                  }`
              }
            }
          )
          .then(response => {
            this.$router.push('/agent/lands');
            return console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      },
      addRow: function addRow() {
        this.Land.pins.push({
          longitude: 0,
          latitude: 0
        });
        this.inputs.push({});
      },
      deleteRow: function deleteRow(index) {
        this.inputs.splice(index, 1);
        this.Land.pins.splice(index, 1);
      },
      checkForm: function (e) {
        e.preventDefault();
        if (
          this.Land.owner
          && this.Land.localization.city
          && this.Land.localization.number
          && this.Land.localization.street
          && this.Land.localization.zipCode) {
          this.validation = true;
          return true
        }
        ;
        this.err = [];
        if (!this.Land.owner) this.err.push("owner required.");
        if (!this.Land.localization.city) this.err.push("city required.");
        if (!this.Land.localization.number) this.err.push("number required.");
        if (!this.Land.localization.street) this.err.push("street required.");
        if (!this.Land.localization.zipCode) this.err.push("zipCode required.");
        e.preventDefault();
      },
      loadFile: function (e) {
        async.forEachOf(e.target.files, (f) => {
          this.files.push(f);
          this.file += ',' + f.name;
        })
        console.log(this.files);
      }
    }
  }
</script>

<style scoped>
  .center-a {
    margin-left: 0;
    margin-right: 0;
    margin: auto;
  }
</style>
