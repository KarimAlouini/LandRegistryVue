<template>
  <div class="form-elements">
    <div v-if="!validation" class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Add New Land">
          <form>
            <div class="row">
              <div class="col-md-12 form-group">
                <div class="input-group">
                  <input id="owner" required v-model="Land.owner"/>
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
                  <input type="number" id="zipcode" v-model="Land.localization.zipCode" required/>
                  <label class="control-label" for="zipcode">Zip Code</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 ">
                <label class="pull-left required"> Pins </label>
              </div>
              <div class="col-md-6 sc_button sc_button_style_dark sc_button_size_huge squareButton dark huge">
                <button @click="addRow" class="btn btn-sm btn-primary btn-with-icon rounded-icon">
                  <span aria-hidden="true" class="center-a glyphicon glyphicon-plus" style="font-size: 20px;"></span>
                </button>
              </div>
            </div>
            <div class="row" v-for="(input,index) in inputs" :key="index">

              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="longitude" v-model.number="Land.pins[index].longitude">
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
                  <button class="btn btn-danger btn-with-icon rounded-icon " @click="deleteRow(index)">
                    <span aria-hidden="true" class="center-a glyphicon glyphicon-minus" style="font-size: 20px;"></span>
                  </button>
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

              <div class="col-md-10 offset-md-1 form-group">
                <b-form-file multiple v-model="file" :state="Boolean(file)"
                             placeholder="Choose a file..."></b-form-file>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-4"></div>
              <div class="col-md-4 ">
                <div class="row">
                  <div class="col-md-6  offset-md-3">
                    <button class=" btn btn-primary" @click="validation=true">
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
                <router-link to="/agent/lands">
                  <button class=" btn btn-primary" @click="addToAPI">
                  Validate
                </button>
                </router-link>
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
      loadFile: function (e) {
        console.log(e);
        this.files = e.target.files;
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
