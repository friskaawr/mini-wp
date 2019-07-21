<template>
  <div id="background">
    <div id="form-register">
      <h4>Register Account</h4>
      <small>Share all your Idea and let everyone see your Idea;)</small>
      <form>
        <b-form-group
          id="first-name"
          label="First Name :"
          label-for="firstname"
        >
          <b-form-input
            id="firstname"
            v-model="user.firstname"
            type="text"
            required
            placeholder="First Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="last-name"
          label="Last Name :"
          label-for="lastname"
        >
          <b-form-input
            id="lastname"
            v-model="user.lastname"
            type="text"
            required
            placeholder="Last Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="email"
          label="Email address:"
          label-for="email-1"
        >
          <b-form-input
            id="email1"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password-1"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="input-1"
            v-model="user.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <div id="right-position">
            <b-button class="button-click" @click="register">Register</b-button>
            <b-button class="button-click" @click="cancel">Cancel</b-button>
        </div>
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
export default {
  data() {
    return {
      optionForm: "login",
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password : ""
      }
    };
  },
  methods : {
      register(){
          console.log(this.user);
          this.$emit('newUser', this.user)
      },
      cancel(){
        this.$emit('statusLogin', '')
      }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Pacifico|Playfair+Display:700|Pontano+Sans&display=swap');
#background{
  background-color: orange;
  padding-top: 2%;
  height: 100vh;
}
#form-register {
  background-color: white;
  margin-left : auto;
  margin-right: auto;
  border: 0.5px solid white;
  border-radius: 2%;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  width: 30%;
  height : 500px;
  padding: 2%;

}
#right-position{
  margin-top: 5px; 
}
.footer-login{
  /* position: absolute; */
  margin-top: 37px;
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
  .button-click{
    background-color: #4CAF50; /* Green */
    border: none
  }
</style>
