const express=require('express');
const cors= require('cors');
const path = require('path');
const fs = require('fs');
const getMimeType = (filePath) => { 
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.mp4':
            return 'video/mp4';
        case '.webm':
            return 'video/webm';
        case '.ogg':
            return 'video/ogg';
        default:
            return 'application/octet-stream'; // Fallback for unknown types
    }
}


const app=express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
    origin: ['http://localhost:5173','http://trilokinnovation.com','https://trilokinnovation.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
app.use(cors(corsOptions));

app.use('/assets', (req, res, next) => {
  // Check if this is a video file request
  if (req.path.match(/\.(mp4|webm|ogg)$/i)) {
    const filePath = path.join(__dirname, 'public', req.path);
    
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', getMimeType(req.path));
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Accept-Ranges', 'bytes');
      
      // Handle range requests here (as shown above)
      // ...
      return;
    }
  }
  
  // Not a video or file doesn't exist - continue with normal static handling
  next();
});
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



app.listen(5000,()=>console.log("Server is up and running...!"))