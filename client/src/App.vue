<template>
  <div>
    <div v-if="optionForm == '' && !isLogin">
      <landing-page @statusLogin="changeStatus"></landing-page>
    </div>
    <div v-if="!isLogin && optionForm !== ''">
      <div v-if="optionForm === 'login'">
        <form-login @statusLogin="changeStatus" @loginPage="loginUser"></form-login>
      </div>
      <div v-if="optionForm === 'register'">
        <form-register  @statusLogin="changeStatus" @newUser="registernewUser"></form-register>
      </div>
    </div>
    <div v-show="isLogin">
      <navbar @statusLogin="changeStatus" @logout="logoutUser" @gotoProfile="getDetailProfile"></navbar>
      <b-container fluid v-if="optionForm == 'homepage'">
        <b-row>
          <b-col cols="3" class="sidebar">
            <!-- <h3>ini sidebar</h3> -->
          </b-col>
          <b-col cols="9">
            <card v-for="article in allArticle" :article="article" :key="article._id"></card>
          </b-col>
        </b-row>
        <!-- Content here -->
      </b-container>
      <div v-if="optionForm== 'createdNewArticle'" class="createnewpost">
        <h2>Create New Post</h2>
        <form @submit.prevent="createPost">
          <label for>Title</label>
          <input type="text" v-model="article.title" name="title" id="title" />
          <input
            type="file"
            ref="file"
            :name="filename"
            @change="upload($event.target.name, $event.target.files)"
            class="upload-input"
          />
          <label for>Featured Image</label>
          <button type="submit" class="button-post">Post</button>
          <wysiwyg v-model="article.content" style="height:400px; margin-top:10px"></wysiwyg>
        </form>
      </div>

      <div v-if="optionForm == 'profile'">
        <profile @statusLogin="changeStatus" :userProfile="user" :userArticle="userArticle"></profile>
      </div>

      <div v-if="optionForm == 'formEdit'">
        <form-profile></form-profile>
      </div>
      <div>
          <footerz class="footer-page"></footerz>
      </div>
    </div>
  </div>
</template>

<script>
import LandingPage from "./components/landingPage.vue";
import formLogin from "./components/formLogin.vue";
import formRegister from "./components/formRegister";
import navbar from "./components/navbar";
import card from "./components/cardArticle";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import formProfile from "./components/formProfile";
import profile from "./components/userProfile";
import footerz from "./components/footer"
import axios from "axios";
let axioss = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  components: {
    // ckeditor: CKEditor.component,
    LandingPage,
    formLogin,
    formRegister,
    navbar,
    card,
    formProfile,
    profile,
    footerz
  },
  data() {
    return {
      isLogin: false,
      isLogin: localStorage.getItem("token") ? true : false,
      filename: "file",
      optionForm: "",
      allArticle: [],
      formData: "",
      userArticle: [],
      link: "",
      article: {
        title: "",
        content: "",
        link: ""
      },
      user: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        profilepicture : ""
      }
    };
  },
  methods: {
    changeStatus(value) {
      console.log(value, "ini value dari emit<<<<<<<<<<<<<<<<<<<<,,");

      this.optionForm = value;
      console.log(this.optionForm);
    },
    registernewUser(value) {
      console.log(value, "ini isi dari anak form register");
      console.log(value.email);
      axioss({
        method: `POST`,
        url: "/users/register",
        data: value
      })
        .then(({ data }) => {
          this.isLogin = true;
          console.log(data);
          this.optionForm = "homepage";
          localStorage.setItem("token", data.token);
          localStorage.setItem("UserId", data.data._id);
        })
        .catch(err => {
          console.log(err, "dia error dong");
        });
    },
    loginUser(value) {

      if (value.type == "Google") {
          console.log(value, "ini value google");
          axioss({
              method: `POST`,
              url: `/users/loginGoogle`,
              data : {
                  id_token : value.id_token
              }
          })
          .then(({data}) => {
              console.log(data, "data dr controller");
              console.log("berhasil login");
              this.isLogin = true;
              this.optionForm = "homepage";
              localStorage.setItem("token", data.token);
              localStorage.setItem("UserId", data.result._id);
          })
          .catch(err => {
              console.log(err);
              
          })
      } else {
          console.log("ini value login biasa"); 
        axioss({
          method: `POST`,
          url: `/users/login`,
          data: {
            email: value.email,
            password: value.password
          }
        })
          .then(({ data }) => {
            console.log(data, "data dr controller");
            console.log("berhasil login");
            this.isLogin = true;
            this.optionForm = "homepage";
            localStorage.setItem("token", data.token);
            localStorage.setItem("UserId", data.data._id);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    logoutUser(value) {
      console.log(value, "logoutt");
      this.isLogin = value;
      this.optionForm = "";
      this.allArticle = [];
      this.article = {};
      this.user = {};
      localStorage.removeItem("token");
      localStorage.removeItem("UserId");
      console.log(this.isLogin, "statusssss");
    },
    getAllArticle() {
      axioss({
        method: `GET`,
        url: `/articles`
      })
        .then(({ data }) => {
          console.log("data", data);
          // this.optionForm='homepage'
          this.allArticle = data;
          if (localStorage.getItem("UserId")) {
            this.getUserArticle(localStorage.getItem("UserId"));
          }
        })
        .catch(err => {});
    },
    upload(fieldName, file) {
      let imageFile = file[0];
      console.log(imageFile, "ini filenya");
      console.log(fieldName, "ini fieldnnya");

      let formData = new FormData();

      formData.append(fieldName, imageFile);
      this.formData = formData;

      axioss({
        method: `POST`,
        url: `/uploads`,
        data: formData
      })
        .then(({ data }) => {
          console.log(data, "ini url abis upload");
          this.link = data.link;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createPost() {
      console.log(this.article);
      // console.log(localStorage.getItem('token'));
      this.article.link = this.link;
      console.log(this.article);

      axioss({
        method: `POST`,
        url: `/articles`,
        data: this.article,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          this.article = {
              title: "",
            content: "",
            link: ""
          }
          this.link = ""
          this.optionForm = "homepage";
          this.getAllArticle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDetailProfile(value) {
      console.log(value);
      this.user.id = value._id;
      this.user.firstname = value.firstname;
      this.user.lastname = value.lastname;
      this.user.email = value.email;
      this.user.profilepicture = value.profilepicture;
    },
    getUserArticle(id) {
      let data = [];
      console.log(id);

      this.allArticle.forEach(element => {
        console.log(element.UserId._id, "<<<,");
        if (element.UserId._id == id) {
          data.push(element);
        }
      });
      this.userArticle = data;
    }
  },
  created() {
    console.log(this.isLogin);
    console.log(this.optionForm);

    if (this.isLogin) {
      this.optionForm = "homepage";
    } else {
      this.optionForm = "";
    }

    this.getAllArticle();
  }
};
</script>

<style>
@import "vue-wysiwyg/dist/vueWysiwyg.css";
* {
  margin: 0;
  padding: 0;
}
.createnewpost {
  padding: 5%;
}
.upload-input {
  border: 0.5px solid #333;
  margin-left: 5%;
  width: 400px;
}
.button-post {
  margin-left: 19%;
  width: 150px;
  border: none;
  height: 35px;
}
.sidebar{
    background-color: #F18805;
    height: 100; 
}
.footer-page{
    bottom: 0;
    height : 150px;
    width: 100%;
    padding : 6%;
    color : #fff;
    background-color: #D95D39;
}
</style>
