<template>
  <div class="profile-page">
    <b-container fluid class="views">
      <b-row>
        <b-col cols="3">
          <img v-if="!userProfile.profilepicture" src="https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif" alt="user" />
           <img v-if="userProfile.profilepicture" :src="userProfile.profilepicture" alt="user" />
          <button style="margin-top:4%" @click="editProfile">Update Profile</button>
        </b-col>
        <b-col cols="8">
          <h2>{{userProfile.firstname}} {{userProfile.lastname}}</h2>
          <small>{{userProfile.email}}</small>
          <hr class="brder-header"/>
          <b-row>
            <h2>My Article</h2>
            <div id="article-card">
            <b-card v-for="article in userArticle" :key="article._id" header-tag="header" footer="Card Footer" footer-tag="footer">
              <b-card-title>{{article.title.toUpperCase()}}</b-card-title>
              <small>{{article.createdAt.substring(0, 10)}}</small>
              <small>Author : {{article.UserId.firstname}} {{article.UserId.lastname}}</small>
              <!-- <b-card-text>{{article.content}}</b-card-text> -->
              <!-- <b-card-text class="text-truncate" v-html="article.content">{{article.content}}</b-card-text> -->
              <b-button href="#" variant="primary">See Detail</b-button>
              <b-button href="#" @click="deleted(article._id)"  variant="primary">Delete</b-button>
            </b-card>
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
let axioss = axios.create({
  baseURL: "http://35.240.213.230"
});

export default {
  props: ["userProfile", "userArticle"],
  methods: {
    editProfile() {
      console.log("ke click mau ke form");

      //   console.log(this.user);
      this.$emit("statusLogin", "formEdit");
    },
    deleted(id){
      console.log("triggeredddd");
      console.log(id, "ini idnya");
    Swal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.value) {
        axioss({
          method : `DELETE`,
          url : `articles/deleteArticles/${id}`,
          headers : { token : localStorage.getItem('token')}
        })
        .then(({data}) => {
          Swal.fire(
            'Deleted!',
            'Your article has been deleted.',
            'success'
          ) 
          console.log(data);
          
          this.$emit('delete-article', data)
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.message || err
          })
        })
      }
})
      
    }
  }
};
</script>

<style scoped>

.profile-page {
  margin-top: 3%;
}
.brder-header{
  border: 2px solid;
  border-color: #D95D39
}
</style>
