const express = require('express');
const { getAllPictures, getPicture, createPicture, deletePicture } = require('../service/GalleryService');
const router = express.Router();
const upload=require('../config/multer');

router.get('/', async (req, res) => {
    const result = await getAllPictures();
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getPicture(id);
    res.send(result);
});

router.post('/',upload.single('image'), async (req, res) => {
    console.log('req.body',req.body);
    console.log("files",req.file)
    const ImageInfo=req.file?{
        image_filename:req.file.filename,
        image_path:`/assets/${req.file.filename}`,
        image_mimetype:req.file.mimetype,
        image_size:req.file.size
    }:null;
    const result = await createPicture(ImageInfo);
    res.send(result)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deletePicture(id);
    res.send(result)
});

module.exports = router;