const url ='http://url.com';
const express = require('express');
const app = express();
const studentRoute =require('./Student')
const facultyRoute = require('./Faculty')
const userRoute = require('./User')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect(url)
mongoose.connection.on('error',err=>{
    console.log('connection failed')
})
mongoose.connection.on('connected',connected=>{
    console.log('connection success')
})

app.use(fileUpload({
    useTempFiles:true
}))
app.use(cors());


//bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute)
app.use('/faculty',facultyRoute)
app.use('/user',userRoute)

app.use((req,res,next)=>{
    res.status(404).json({
        error: 'bad request'
    })
})



module.exports= app;