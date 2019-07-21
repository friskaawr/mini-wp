if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV){
    require('dotenv').config()
}

const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errHandler = require('./middlewares/errHandler')
const port = process.env.PORT || 3000

mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser : true})
.then((response) => {
    console.log("Connected to database");
})
.catch(err => {
    console.log(err);
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use(cors())
app.use('/', routes)
app.use(errHandler)

app.listen(port, () => {
    console.log("this server is running on port", port);
})
