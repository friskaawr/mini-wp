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
            <b-card v-for="article in userArticle" header-tag="header" footer="Card Footer" footer-tag="footer">
              <b-card-title>{{article.title.toUpperCase()}}</b-card-title>
              <small>{{article.createdAt.substring(0, 10)}}</small>
              <small>Author : {{article.UserId.firstname}} {{article.UserId.lastname}}</small>
              <!-- <b-card-text>{{article.content}}</b-card-text> -->
              <!-- <b-card-text class="text-truncate" v-html="article.content">{{article.content}}</b-card-text> -->
              <b-button href="#" variant="primary">See Detail</b-button>
            </b-card>
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ["userProfile", "userArticle"],
  methods: {
    editProfile() {
      console.log("ke click mau ke form");

      //   console.log(this.user);
      this.$emit("statusLogin", "formEdit");
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
