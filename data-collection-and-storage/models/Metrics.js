const mongoose = require('../db/connection');



// schema
const MetricSchema = new mongoose.Schema({
    loadTimes:{
        high: Number,
        low: Number,
        avg: Number,
        data:{
            time: [ Number ]
        }
    },
    browser: {
        chrome: Number,
        firefox: Number,
        safari: Number,
        ie: Number,
        other: Number,
    },
    deviceType: {
        mobile: Number,
        tablet: Number,
        desktop: Number
    },
    location: [
        {
            lat: Number,
            long: Number
        }
    ]
});

//model
const Metric = mongoose.model("Metric", MetricSchema);

//export
module.exports = Metric;
