const express = require('express');
const router = express.Router();
const { getAllFeesStructure, getFeesStructure, createFeesStructure, updateFeesStructure, deleteFeesStructure } = require('../service/FeesService')

router.get('/', async (req, res) => {
    const result = await getAllFeesStructure();
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getFeesStructure(id);
    res.send(result);
});

router.post('/', async (req, res) => {
    const result = await createFeesStructure(req.body);
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await updateFeesStructure(id, req.body);
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteFeesStructure(id);
    res.send(result);
});

module.exports = router;