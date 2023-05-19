const mongoose = require('mongoose');

const PerformanceDataSchema = new mongoose.Schema({
  id: { type: String, required: true },
  wholeTimingObject: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },
  pageLoadStart: { type: Number, required: true },
  pageLoadEnd: { type: Number, required: true },
  totalLoadTime: { type: Number, required: true },
});

exports.PerformanceData = mongoose.model('PerformanceData', PerformanceDataSchema);
