const express = require('express');
const { getAllSchedules, getSchedule, createSchedule,deleteSchedule } = require('../service/ScheduleService');
const router = express.Router();
const upload=require('../config/multer');

router.get('/', async (req, res) => {
    const result = await getAllSchedules();
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const id=req.params.id;
    const result = await getSchedule(id);
    res.send(result);
});

router.post('/', upload.single('pdfFile'),async (req, res) => {
    console.log(req.body);
    console.log("files",req.file);
    const pdfInfo=req.file?{
        pdf_filename:req.file.filename,
        pdf_path:`/assets/${req.file.filename}`,
        pdf_mimetype:req.file.mimetype,
        pdf_size:req.file.size
    }:null;
   const result = await createSchedule(pdfInfo,req.body.topic,req.body.subject);
   res.send(result);
});

router.delete('/:id', async (req, res) => {
    const id=req.params.id;
    const result = await deleteSchedule(id);
    res.send(result);
});

module.exports=router;