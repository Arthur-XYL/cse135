const mongoose = require('mongoose');

const StaticDataSchema = new mongoose.Schema({
    sessionId: { type: String },
    userAgent: { type: String },
    language: { type: String },
    cookiesEnabled: { type: Boolean },
    javaScriptEnabled: { type: Boolean },
    screenDimensions: {
        width: { type: Number },
        height: { type: Number }
    },
    windowDimensions: {
        width: { type: Number },
        height: { type: Number }
    },
    networkConnection: { type: String },
    imagesEnabled: { type: Boolean },
    cssEnabled: { type: Boolean }
});

exports.StaticData = mongoose.model('StaticData', StaticDataSchema);
