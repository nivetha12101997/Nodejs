const express = require('express');
const router = express.Router();
const { getAllBatches, getBatch, updateBatch, deleteBatch, createBatch } = require('../service/BatchService');

router.get('/', async (req, res) => {
    const result = await getAllBatches();
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getBatch(id);
    res.send(result);
});

router.post('/', async (req, res) => {
    const result = await createBatch(req.body);
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await updateBatch(id, req.body);
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteBatch(id);
    res.send(result);
});

module.exports = router;