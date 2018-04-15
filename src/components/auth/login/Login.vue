<template>
  <div  class="row" style="margin: auto">
  <vuestic-widget>
    <div class="login">
      <h2>{{'auth.welcome' | translate}}</h2>

        <div class="form-group">
          <div class="input-group">
            <input type="text" id="email"v-model="login" required="required"/>
            <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="password" id="password" v-model="pwd" required="required"/>
            <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
          </div>
        </div>
        <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
          <input type="submit"class="btn btn-primary" @click="doLogin" value="Login">
          <h6>{{this.msg}}</h6>
        </div>
    </div>
  </vuestic-widget>
  </div>
</template>

<script>
  /*eslint-disable*/
  import VuesticWidget from "../../../vuestic-theme/vuestic-components/vuestic-widget/VuesticWidget"
  import axios from "axios"

  export default {
    components: {VuesticWidget},
    name: 'login',
    data() {
      return {
        login: '',
        pwd: '',
        msg: '',
        token: ''
      }
    },
    methods: {
      test(){
        this.$root.$emit('login',{'status':true,'role':'admin'});
      },
      doLogin() {
        axios
          .post("http://localhost:1000/api/users/AgentLogin", {"login":this.login,"pwd":this.pwd})
          .then(response => {
            this.msg = "Connected"
            axios
              .post("http://localhost:1000/api/lands/generatToken", response.data)
              .then(resp => {
                localStorage.setItem("token",resp.data.token);
                localStorage.setItem("connectedUserRole",response.data.role);
                window.location.replace("http://localhost:8080/#/");

              })
              .catch(err => {
                this.msg = "Unvalide Login Or Password"
              });
          })
          .catch(error => {
            this.msg = "Unvalide Login Or Password"

          });
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '~bootstrap/scss/mixins/breakpoints';
  @import "~bootstrap/scss/functions";
  @import '~bootstrap/scss/variables';

  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
