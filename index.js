const http = require('http')
const app =require('./route/app')


const express =require('express');


const server = http.createServer(app);



server.listen(4000,console.log(" iam running"))