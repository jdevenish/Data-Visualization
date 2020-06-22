const mongoose = require('../db/connection');



// schema
const RawDataSchema = new mongoose.Schema({
    loadTime: {
        time: Number,
        date: Date
    },
    screenWidth: Number,
    geolocation: {
        zip: Number,
        date: Date
    },
    deviceType: String
});

//model
const RawData = mongoose.model("RawData", RawDataSchema);

//export
module.exports = RawData;
