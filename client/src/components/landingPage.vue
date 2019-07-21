<template>
    <div id="landingpage">
        <nav class="landing-nav">
            <h5 class="brand"><i class="fas fa-newspaper"></i>Mini-Wp</h5>
        </nav>
        
        <div class="container header-text">
            <h1 style="text-align:center">Publish your passions, your way</h1>
            <h5 style="text-align:center">Create a unique and beautiful blog. It’s easy and free.</h5>
           <div class="choose-button">
                <button class="button-click" @click=changeStatus("login")> Login </button>
                <button class="button-click" @click=changeStatus("register")> Register </button>
           </div>
        </div>
        <div id=carousel-landing>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 1px #000; height: 240px; width:512px"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="Beauty Tips"
      img-src="https://img.etimg.com/thumb/height-450,width-800,msid-68866149,imgsize-143934/make-up-enthusiasts.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Music Concert"
      img-src="http://getwallpapers.com/wallpaper/full/1/c/9/72861.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Cooking Tips"
      img-src="https://ak0.picdn.net/shutterstock/videos/1676800/thumb/1.jpg"
    ></b-carousel-slide>
  </b-carousel>
</div>
    <div class="footer">
        <p class="footer-text">&copy; Zahriah Friska - 2019 </p>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            isLogin : false,
            // isLogin : localStorage.getItem('token') ? true : false
        }
    },
    methods : {
        changeStatus(value){
            console.log(value);
            
            this.$emit('statusLogin', value)   
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Pacifico|Playfair+Display:700&display=swap');
   #landingpage{
        /* background-image: url("../img/home-page.png"); */
        font-family: 'Playfair Display', serif;
        background-color: orange;
        background-repeat: no-repeat;
        background-position: 0% 50%;
        background-size: 30%;
        height: 100vh;
    }#carousel-landing{
          display: flex;
          margin-top: 50px;
          align-items: center;
          justify-content: center;
    }
    .choose-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .landing-nav{
        height: 50px;
        background-color: #C8553D
    }
    .button-click {
        /* border : none;
        color: #000;
        width: 150px;
        height: 50px; */
        width: 140px;
        height: 45px;
        margin-top : 20px;
        margin-left: 20px;
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: 500;
        color: #000;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
    }
    .button-click:hover {
        background-color: #C8553D;
        box-shadow: 0px 15px 20px rgba(228, 159, 114, 0.4);
        color: #fff;
        transform: translateY(-7px);
    }
    .brand{
        padding: 2px;
        margin-left: 30px;
        font-family: 'Pacifico', cursive;
        color: #fff;
        font-size: 30px
    }
    .header-text{
        margin-top: 30px
    }
    .footer{
        color: #000;
        margin-top : 35px; 
        margin-left: 83% 
    }
</style>
