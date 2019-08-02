const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hashPassword} = require('../helpers/bcrypt')

let uniqueEmail = function(email){
  return User.findOne({email : email})
  .then(data => {
    if(data) return false
    else return true
  })
}

let validateEmail = function(email){
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const userSchema = new Schema({
  firstname:  {
      type : String,
      required : [true, 'Fill this field']
  },
  lastname: {
    type : String,
    required : [true, 'Fill this field']
  },
  email:  {
    type : String,
    required : [true, 'Fill this field'],
    validate : [
      {validator : validateEmail, msg: 'Please fill a valid email address'},
      {validator : uniqueEmail, msg : 'Please use other email address'}]
  },
  profilepicture : {
    type : String,
  },
  password: {
    type : String,
    required : [true, 'Fill this field']
  }
}, {timestamps: true});

userSchema.pre('save', function(next){
    this.profilepicture = "https://storage.googleapis.com/mini-wpstorage-friska/1563714564898nopic_192.gif"
    this.password = hashPassword(this.password)
    console.log(this.profilepicture, this.password, "udah dihashhhhhhhh");
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User