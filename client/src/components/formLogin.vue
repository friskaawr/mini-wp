<template>
  <div id="background">
    <div id="form-login">
      <h3>Login to your Account</h3>
      <form>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password" label="Password:" label-for="password">
          <b-form-input
            id="input-2"
            v-model="user.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
          <b-button class="button-click" @click="login">Login</b-button>
          <b-button class="button-click" @click="cancel">Cancel</b-button>
            <GoogleLogin style="padding-top:10px;" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
      </form>
    </div>
    <div id="footer">
      <footer class="footer-login">
        <p class="footer-text">&copy; Mini-Wp Zahriah Friska 2019</p>
      </footer>
    </div>
  </div>
</template>

<script>
  import GoogleLogin from 'vue-google-login';

export default {
  components : {
    GoogleLogin
  },
  data() {
    return {
      params: {
          client_id:"690287163349-rm0i8h5rks0ttbb1rkcfntd47mfu76do.apps.googleusercontent.com"
        },
                // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      },
      optionForm: "login",
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if(!this.user.email || !this.user.password){
        Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
})
      } else {
        console.log(this.user);
        this.$emit("loginPage", this.user);
      }
    },
    cancel(){
      this.$emit('statusLogin', '')
    },
    onSuccess(googleUser) {
        console.log(googleUser);
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        
        // This only gets the user information: id, name, imageUrl and email
        console.log(googleUser.getBasicProfile());
        this.$emit("loginPage", {
          type : "Google",
          id_token
        })
    },
    onFailure(error) {
      console.log(error)
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Pacifico|Playfair+Display:700|Pontano+Sans&display=swap');
#background{
  background-color: orange;
  padding-top: 5%;
  height: 100vh;
}
#form-login {
  background-color: white;
  padding-top : 40px;
  margin-left : auto;
  margin-right: auto;
  padding: 5%;
  border: 0.5px solid white;
  border-radius: 2%;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  width: 30%;
  height : 430px;
  padding: 2%;

}
.footer-login{
  /* position: absolute; */
  margin-top: 66px;
  background-color:#D95D39; 
  /* top:50%; */
  height: 50px;
  color: white;
  text-align: center;
}
.footer-text{
  font-family: 'Pontano Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
}
</style>
