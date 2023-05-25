const { StaticData } = require('../models/StaticData.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const staticEntries = await StaticData.find({}); // all the entires
        res.status(200).json(staticEntries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const singleEntry = await StaticData.findById(id);
        res.status(200).json(singleEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            sessionId,
            userAgent,
            language,
            cookiesEnabled,
            javaScriptEnabled,
            screenDimensions,
            windowDimensions,
            networkConnection,
            imagesEnabled,
            cssEnabled,
        } = req.body;

        const existingData = await StaticData.findOne({
            sessionId,
            userAgent,
            language,
            cookiesEnabled,
            javaScriptEnabled,
            screenDimensions,
            windowDimensions,
            networkConnection,
            imagesEnabled,
            cssEnabled,
        });

        if (existingData) {
            return res.status(200).json({ message: "The entry already exists." });
        } else {
            const staticData = new StaticData(req.body);
            await staticData.save();
            return res.status(201).send(staticData);
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEntry = await StaticData.findByIdAndUpdate(id, req.body, { new: true });
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
        const deletedEntry = await StaticData.findByIdAndRemove(id);
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
