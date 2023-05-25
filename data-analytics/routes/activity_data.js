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

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEntry = await ActivityData.findByIdAndUpdate(id, req.body, { new: true });
        if(updatedEntry){
            res.status(200).json(updatedEntry);
        } else {
            res.status(404).json({ message: "Entry not found." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await ActivityData.findByIdAndRemove(id);
        if(deletedEntry){
            res.status(200).json({ message: "Entry deleted successfully." });
        } else {
            res.status(404).json({ message: "Entry not found." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
