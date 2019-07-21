<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Mini-Wp</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      <b-navbar-nav>
        <b-nav-item href="#" @click="toHome">Home</b-nav-item>
        <b-nav-item href="#" @click="create">Create</b-nav-item>
      </b-navbar-nav>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><em>User</em></template>
          <b-dropdown-item href="#"  @click="toProfile" >Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout" >Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import axios from 'axios'
let axioss = axios.create({
    baseURL : 'http://localhost:3000',
})

export default {
    methods : {
        logout(){
            this.$emit('logout', false)
        },
        create(){
            console.log("ke click test test");
            
            this.$emit('statusLogin', "createdNewArticle")
        },
        toHome(){
            this.$emit('statusLogin', "homepage")
        },
        toProfile(){
            // this.$emit('statusLogin', "profile")
            let id = localStorage.getItem('UserId')
            axioss({
                method:`GET`,
                url :  `/users/${id}`
            })
            .then(({data}) => {
                console.log(data);
                this.$emit('gotoProfile', data)
                this.$emit('statusLogin', "profile")
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>
