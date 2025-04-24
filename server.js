const express=require('express');
const cors= require('cors');
const path = require('path');


const app=express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
app.use(cors(corsOptions));


// 1. Absolute path to public directory
// const publicDir = path.join(__dirname, '../public/assets');
// console.log("dir name ,",__dirname);
// console.log('Public directory absolute path:', publicDir);
app.use('/assets',express.static('public/assets'));


const facultyRoutes = require('./Router/Faculty_router')
const batchRoutes = require('./Router/Batch_router')
const feesRoutes = require('./Router/Fees_router')
const scheduleRoutes = require('./Router/Schedule_router')
const galleryRoutes = require('./Router/Gallery_router')


app.use('/api/v1/faculty',facultyRoutes);
app.use('/api/v1/batch',batchRoutes);
app.use('/api/v1/fees',feesRoutes);
app.use('/api/v1/schedule',scheduleRoutes);
app.use('/api/v1/gallery',galleryRoutes);


const port=process.env.MYSQL_PORT || 5000;
app.listen(port,()=>console.log("Server is up and running...!"))