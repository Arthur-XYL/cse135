const mongoose = require('mongoose');

const ActivityDataSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    thrown_errors: [{
        _id: false,
        message: { type: String },
        source: { type: String },
        lineno: { type: Number },
        colno: { type: Number },
        error: { type: String },
    }],
    mouseMovements: [{
        _id: false,
        x: { type: Number },
        y: { type: Number },
    }],
    clicks: [{
        _id: false,
        x: { type: Number },
        y: { type: Number },
        button: { type: Number },
    }],
    scrolls: [{
        _id: false,
        x: { type: Number },
        y: { type: Number },
    }],
    keyEvents: [{
        _id: false,
        key: { type: String },
        type: { type: String },
    }],
    idleTimes: [{
        _id: false,
        start: { type: Date },
        end: { type: Date },
        duration: { type: Number },
    }],
    pageEntries: { _id: false, type: Date },
    pageExits: { _id: false, type: Date },
    pageUrls: [{ _id: false, type: String }],
});

exports.ActivityData = mongoose.model('ActivityData', ActivityDataSchema);
