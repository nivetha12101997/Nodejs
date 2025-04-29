const express = require('express');
// const app=express();
const router = express.Router();

const upload=require('../config/multer');
const { getAllFaculties, getFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../service/FacultyService');


router.get('/', async (req, res) => {
    const faculties = await getAllFaculties();
    // console.log("Faculty from backend ",faculties[0]);
    // const modifiedFacultyList=faculties.map(faculty=>{
    //     const facultyData=faculty;
    //     facultyData.achievements=faculty.achievements.split(',');
    //     console.log("FACULTY SINGLE DATA",facultyData);
    //     return facultyData;
    // });
    // console.log("modifiedFacultyList",modifiedFacultyList)
    res.json(faculties)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const faculty = await getFaculty(id);
    res.send(faculty);
});

router.post('/', upload.single('image'), async (req, res) => {
    const { name,
        designation,
        experience,
        email,
        about,
        education,
        achievements,
        workExperience } = req.body;

    // Get file info if uploaded
    const imageInfo = req.file ? {
        filename: req.file.filename,
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
});

router.put('/:id',upload.single('image'), async (req, res) => {
    const id = req.params.id;
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
