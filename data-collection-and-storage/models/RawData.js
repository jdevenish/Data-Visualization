const mongoose = require('../db/connection');

// schema
const RawDataSchema = new mongoose.Schema({
    loadTime: {
        time: Number,
        date: Date,
        type: String
    },
    screenWidth: Number,
    geolocation: {
        city: String,
        state: String,
        country: String,
        date: Date
    },
    deviceType: String
});

//model
const RawData = mongoose.model("RawData", RawDataSchema);

//export
module.exports = RawData;
