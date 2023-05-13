const { PerformanceData } = require('../models/PerformanceData.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const performanceEntries = await PerformanceData.find({}); // all the entires
        res.status(200).json(performanceEntries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const singleEntry = await PerformanceData.findById(id); 
        res.status(200).json(singleEntry);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const performanceData = new PerformanceData(req.body);
        performanceData.markModified('wholeTimingObject');
        await performanceData.save();
        res.status(201).send(performanceData);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
