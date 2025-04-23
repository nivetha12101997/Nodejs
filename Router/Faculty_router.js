const express = require('express');
const app=express();
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getAllFaculties, getFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../service/FacultyService');

// 1. Absolute path to public directory
// const publicDir = path.join(__dirname, '../public/assets');
// console.log("dir name ,",__dirname);
// console.log('Public directory absolute path:', publicDir);

// app.use(express.static(publicDir));
// app.use('/assets',express.static(path.join(publicDir)));


// console.log('Does directory exist?', fs.existsSync(publicDir));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  path.join(__dirname, '../public/assets'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    const faculties = await getAllFaculties();
    console.log("Faculty API",faculties);

    // const imagePath = path.join(publicDir, 'assets/image_1745209591826.png');
    
    // const exists = fs.existsSync(imagePath);
    //     console.log("exists..... imagePath ...........",exists, imagePath);

    // res.send(faculties);
    res.json(faculties)
});



router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const faculty = await getFaculty(id);
    res.send(faculty);
});

router.post('/', upload.single('image'), async (req, res) => {
    // console.log("post API ", req.body);
    console.log("REQ.FILE ",req.file);

    // const fileOnDisk = fs.existsSync(req.file.path);
    // if (!fileOnDisk) {
    //     throw new Error('File was not saved to disk');
    //   }
  
    const { name,
        designation,
        experience,
        email,
        about,
        education,
        achievements,
        workExperience } = req.body;
    // console.log("req.body", req.body);

    // Get file info if uploaded
    const imageInfo = req.file ? {
        filename: req.file.filename,
        // path:req.file.path,
        path:`/assets/${req.file.filename}`,
        mimetype: req.file.mimetype,
        size: req.file.size
    } : null;


    const faculty = await createFaculty({
        name,
        designation,
        experience,
        email,
        about,
        education,
        achievements,
        workExperience, imageInfo
    });
    res.send(faculty);
    // res.send(`File saved at: ${imageInfo.path}`);

});

router.put('/:id',upload.single('image'), async (req, res) => {
    const id = req.params.id;
    console.log("PUT API ", req.body, id);
    console.log("REQ.FILE ",req.file);

    // if(req.file===undefined){
    //     console.log("No files....");
    //     const imageobj=JSON.stringify(req.body.image);
    //     console.log("image obj parsed ",imageobj);
    // }

    const { name,
        designation,
        experience,
        email,
        about,
        education,
        achievements,
        workExperience } = req.body;

        const imageInfo = req.file ? {
            filename: req.file.filename,
            path:`/assets/${req.file.filename}`,
            mimetype: req.file.mimetype,
            size: req.file.size
        } : {
            filename: req.body.filename||null,
            path:req.body.path||null,
            mimetype: req.body.mimetype||null,
            size: req.body.size||null
        };

    const faculty = await updateFaculty(id, name,
        designation,
        experience,
        email,
        about,
        education,
        achievements,
        workExperience,imageInfo);
    res.send(faculty);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const faculty = await deleteFaculty(id);
    res.send(faculty);
});


module.exports = router;
