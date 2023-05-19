const { ActivityData } = require('../models/ActivityData.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const activityEntries = await ActivityData.find({}); // all the entires
        res.status(200).json(activityEntries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const singleEntry = await ActivityData.findById(id); 
        res.status(200).json(singleEntry);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const activityData = new ActivityData(req.body);
        await activityData.save();
        res.status(201).send(activityData);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
