const express = require('express');
const app = express();
const studentRoute = require('./api/route/student');
const userRoute = require('./api/route/user');
const batchRoute = require('./api/route/batch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect('mongodb+srv://Riyan-Ahmed:iloveallah1112842073@riyan.orxaate.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('error',err=>{
    console.log('connection failed');
})

mongoose.connection.on('connected',()=>{
    console.log('connected with database');
})


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/student',studentRoute);
app.use('/batch',batchRoute);
app.use('/user',userRoute);

app.use((req,res,next)=>{
    res.status(200).json({
        message:'bad request'
    })
})

module.exports = app;