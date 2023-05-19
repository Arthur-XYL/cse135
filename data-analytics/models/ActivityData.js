const mongoose = require('mongoose');

const ActivityDataSchema = new mongoose.Schema({
    id: { type: String, required: true },
    thrown_errors: [{
        message: { type: String },
        source: { type: String },
        lineno: { type: Number },
        colno: { type: Number },
        error: { type: String },
    }],
    mouseMovements: [{
        x: { type: Number },
        y: { type: Number },
    }],
    clicks: [{
        x: { type: Number },
        y: { type: Number },
        button: { type: Number },
    }],
    scrolls: [{
        x: { type: Number },
        y: { type: Number },
    }],
    keyEvents: [{
        key: { type: String },
        type: { type: String },
    }],
    idleTimes: [{
        start: { type: Date },
        end: { type: Date },
        duration: { type: Number },
    }],
    pageEntries: [{ type: Date }],
    pageExits: [{ type: Date }],
    pageUrls: [{ type: String }],
});

exports.ActivityData = mongoose.model('ActivityData', ActivityDataSchema);

