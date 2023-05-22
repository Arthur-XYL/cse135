const { StaticData } = require('../models/StaticData.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("this is /api/static_data path");
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


module.exports = router;
