const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../models/user')
const {sign} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')
const generatePassword = require('password-generator')

class UserController{
    static register(req, res, next){
        console.log("masuk controller register");
        const {firstname, lastname, email, password} = req.body
        let newUser = {firstname, lastname, email, password}

        User.create(newUser)
        .then((created) =>{
            console.log("ke create");
            let fullname = `${created.firstname} ${created.lastname}`
            let user = {
                id : created._id,
                fullname : fullname
            }
            let token = sign(user)
            res.status(201).json({
                data : created,
                token
            })
        })
        .catch(next)
    }

    static loginUser(req, res, next){
        const {email, password} = req.body
        User.findOne({email : email})
        .then(found => {
            console.log(found);
            
            if(found){
                if(comparePassword(password, found.password)){
                    let fullname = `${found.firstname} ${found.lastname}`
                    let user = {
                        id : found._id,
                        fullname : fullname
                    }
                    let token = sign(user)
                    res.status(200).json({
                        data : found,
                        token
                    })

                } else {
                    throw {
                        code : 404,
                        message : `username / password is invalid`
                    }
                }
            } else {
                throw {
                    code : 404,
                    message : `username / password is invalid`
                }
            }
        })
        .catch(next)
    }

    static findOne(req, res, next){
        User.findById(req.params.id)
        .then(data => {
            console.log(data, "foundd!");
            res.status(200).json(data)
        })
        .catch(next)
    }

    static loginGoogle(req, res, next){
        // console.log(req.body, "ini reqbody");
        
        client.verifyIdToken({
            idToken : req.body.id_token,
            audience : process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            console.log(ticket, "ini ticketnya");
            
            const payload = ticket.getPayload()  
            User.findOne({
                email : payload.email
            })
            .then(result => {
                if(result){
                    const {id, username, name, email, password} = result
                    const found = {id, username, name, email, password}
                    const token = sign(found, process.env.JWT_SECRET)            
                    res.status(200).json({result, token})
                    
                } else {
                    const {email, given_name, family_name} = payload
                    const password = generatePassword()
                    const newUser = {
                        firstname: given_name,
                        lastname : family_name,
                        email, 
                        password
                    }
                    console.log(newUser, "ini new user");
                    
                    return User.create(newUser)
                    .then(result => {
                        let fullname = `${result.firstname} ${result.lastname}`
                        let tokenNewUser = {
                            id: result._id,
                            fullname : fullname,
                            email : result.email
                        }
                        const token = sign(tokenNewUser, process.env.JWT_SECRET)
                        
                        res.status(201).json({
                            message : `User Created`,
                            result,
                            token : token
                        })
                    })
                    .catch(next)
                }
            })
            .catch(next)
        })
        .catch(err => {
            console.log(err);
            
        })
    }
}

module.exports = UserController