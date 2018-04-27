<template>
  <div class="form-elements">
    <div v-if="!validation" class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Add New User">
          <form @submit="checkForm" method="post">
            <div v-if="err.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in err">{{ error }}</li>
              </ul>
            </div>
            <div class="row">
              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="fName" required v-model="User.fName"/>
                  <label class="control-label" for="fName">First Name</label><i class="bar"></i>
                </div>
              </div>
              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="lName" required v-model="User.lName"/>
                  <label class="control-label" for="lName">Last Name</label><i class="bar"></i>
                </div>
              </div>
              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="login" required v-model="User.login"/>
                  <label class="control-label" for="login">Login</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 form-group with-icon-right">
                <div class="input-group">
                  <input
                    v-model="User.email"
                    id="successfulEmail"
                    name="successfulEmail"
                    v-validate="'required|email'"
                    required/>
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label" for="successfulEmail">Email</label><i
                  class="bar"></i>
                  <small v-show="errors.has('successfulEmail')" class="help text-danger">
                    {{ errors.first('successfulEmail') }}
                  </small>
                </div>
              </div>
              <div class="col-md-4 form-group with-icon-right" :class="{'has-error': errors.has('wrongEmail')}">
                <div class="input-group">
                  <input
                    id="wrongEmail"
                    name="wrongEmail"
                    v-validate="'required|email'"
                    required/>
                  <i class="fa fa-exclamation-triangle icon-right input-icon" v-show="errors.has('wrongEmail')"></i>
                  <label class="control-label" for="wrongEmail">Validate Email</label><i class="bar"></i>
                  <small v-show="errors.has('wrongEmail')" class="help text-danger">{{ errors.first('wrongEmail')
                    }}
                  </small>
                </div>
              </div>
              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="cin" required v-model="User.cin"/>
                  <label class="control-label" for="cin">CIN</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 form-group">
                <div class="input-group">
                  <input id="blockchainAddress" v-model="User.blockchainAddress" required/>
                  <label class="control-label" for="blockchainAddress">Walet Address</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-4"></div>
              <div class="col-md-4 ">
                <div class="row">
                  <div class="col-md-6  offset-md-3">
                    <button class=" btn btn-primary" type="submit" @submit.prevent = "checkForm($event)">
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
                <td class="label">First Name:</td>
                <td>{{User.fName}}</td>
              </tr>
              <tr>
                <td class="label">Last Name:</td>
                <td>{{User.lName}}</td>
              </tr>
              <tr>
                <td class="label">Login:</td>
                <td>{{User.login}}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td>{{User.email}}</td>
              </tr>
              <tr>
                <td class="label">Cin:</td>
                <td>{{User.cin}}</td>
              </tr>
              <tr>
                <td class="label">Wallet Address:</td>
                <td>{{User.blockchainAddress}}</td>
              </tr>
              </tbody>
            </table>
            <div class="row">
              <div class="center-a">
                <button class=" btn btn-danger" @click="validation=false">
                  Undo
                </button>
                <router-link to="/agent/users">
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
    name: 'add-user',
    data() {
      return {
        User: {
          login: "",
          email: "",
          fName: "",
          lName: "",
          cin: "",
          blockchainAddress: ""
        },
        err: [],
        validation: false
      };
    },
    methods: {
      addToAPI() {
        let newUser = {
          fName: this.User.fName,
          lName: this.User.lName,
          email: this.User.email,
          idCard: this.User.cin,
          login: this.User.login,
          blockchainAddress: this.User.blockchainAddress
        }
        console.log(newUser);
        axios.post('http://localhost:1000/api/agent/addUser', newUser)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);

          });
      },
      checkForm:function(e) {
        e.preventDefault();
        if(
          this.User.fName
          && this.User.lName
          && this.User.email
          && this.User.cin
          && this.User.login
          && this.User.blockchainAddress)
        {
          this.validation=true;
          return true
        };
        this.err = [];
        if(!this.User.fName) this.err.push("First Name required.");
        if(!this.User.lName) this.err.push("Last Name required.");
        if(!this.User.email) this.err.push("Email required.");
        if(!this.User.cin) this.err.push("CIN required.");
        if(!this.User.login) this.err.push("Login required.");
        if(!this.User.blockchainAddress) this.err.push("Blockchain Address required.");
        e.preventDefault();
      }
    }
  }
</script>

<style scoped>
  .label {
    font-weight: bold;
  }

  .center-a {
    margin-left: 0;
    margin-right: 0;
    margin: auto;
  }

</style>
