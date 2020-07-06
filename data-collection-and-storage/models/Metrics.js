const mongoose = require('../db/connection');



// schema
const MetricSchema = new mongoose.Schema({
    loadTimes:{
        high: { type: Number, default: 0 },
        low: { type: Number, default: 999999 },
        avg: { type: Number, default: 0 },
        data:[
            {
                _id: false,
                time: Number,
                date: Date
            }
        ]
    },
    browser: {
        chrome: { type: Number, default: 0 },
        firefox: { type: Number, default: 0 },
        safari: { type: Number, default: 0 },
        ie: { type: Number, default: 0 },
        other: { type: Number, default: 0 }
    },
    deviceType: {
        mobile: { type: Number, default: 0 },
        tablet: { type: Number, default: 0 },
        desktop: { type: Number, default: 0 }
    },
    location: [
        {
            _id: false,
            city: String,
            state: String,
            country: String,
            date: Date
        }
    ]
});

//model
const Metric = mongoose.model("Metric", MetricSchema);

//export
module.exports = Metric;
