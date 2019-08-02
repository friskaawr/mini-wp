<template>
  <div>
    <b-container fluid class="views">
      <b-row>
        <b-col cols="12">
          <h2>Edit Profile</h2>
        </b-col>
      </b-row>
      <b-row class="forms">
        <b-col cols="3" class="sidebar">
          <label for="uploadfoto">Upload Foto</label>
          <input id="upload" type="file" ref="file" :name="filename" @change="upload($event.target.name, $event.target.files)" style="border: 1px solid #333" />
          <button type="submit" @click="postFoto">Upload</button>
        </b-col>
        <b-col cols="9">
          <b-form class="edits">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input id="input-1" type="email" placeholder="Enter email"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
              <b-form-input id="input-2" placeholder="Enter name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Last Name:" label-for="input-2">
              <b-form-input id="input-2" placeholder="Enter name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input id="input-2" placeholder="Enter name"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
let axioss = axios.create({
    baseURL : 'http://35.240.213.230',
})
export default {
      data() {
    return {
      filename: "file",
      formData : "",
      user : {
          email : "",
          firstname : "",
          lastname : "",
          password : ""
      }
    };
  },
  methods: {
    upload(fieldName, file) {
      let datafile = document.getElementById('upload').value
      console.log(datafile, "ini data file  ");
      
      // console.log(this.filename, "ini fileist");
      let imageFile = file[0]
      console.log(imageFile, "ini filenya");
      console.log(fieldName, "ini fieldnnya");
      
      let formData = new FormData()

      formData.append(fieldName, imageFile)
      this.formData = formData
      console.log(formData, "ini form data");
    },
    postFoto(){
        console.log("ke click");
        
        axioss({
            method: "POST",
            url: `http://localhost:3000/uploads`,
            data: this.formData
      })
      .then(({data}) => {
          console.log("data");
          console.log(data);
          
      })
      .catch(err => {
          console.log(err);
      })
    }
  }
};
</script>

<style>
.views {
  padding: 3%;
}
.edits {
  margin: 2%;
}
/* .sidebar{
    margin-left : 1%;
} */
</style>
