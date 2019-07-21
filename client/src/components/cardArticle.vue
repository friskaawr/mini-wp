<template>
  <div id="article-card">
      <b-card
        header-tag="header"
        footer="Card Footer"
        footer-tag="footer"
      >
        <b-card-title>{{article.title.toUpperCase()}}</b-card-title>
        <small>{{article.createdAt.substring(0, 10)}} </small>
        <small>Author : <a href="#">{{article.UserId.firstname}} {{article.UserId.lastname}}</a></small>
        <!-- <b-card-text>{{article.content}}</b-card-text> -->
        <br><br>
        <img v-if="article.link" :src="article.link" alt="featured-image" style="display:block; width:500px; height:280px; margin-right:20%; margin-left:20%;">
        <br>
        <b-card-text class="text-truncate" v-html="article.content">{{article.content}}</b-card-text>
        <b-button href="#" variant="primary">See Detail</b-button>
      </b-card>
  </div>
</template>

<script>
export default {
    props : ["article"],
    created() {
      console.log('createddddd');
      
    }
};
</script>

<style>
    #article-card{
        margin-top:5%;
        margin-right:4%;
        margin-left:4%;
        margin-bottom: 5%;
    }
    .article-text{
        line-height: 1.5em;
        height: 2em;       /* height is 2x line-height, so two lines will display */
        overflow: hidden;
    }
</style>
