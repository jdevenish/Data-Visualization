const RawData = require("../models/RawData");
const Metric = require("../models/Metrics");

const addData = (req, res) => {
    // Create raw data entry
    RawData.create(req.body).then(() => {
        res.status(200).
            json({
                status: 200,
                message: "Data added successfully"
        })
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                error: err
            })
    })
};

const getData = (req, res) => {
    RawData.find().then(data => {
        res.status(200)
            .json({
                status: 200,
                data: data
            });
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                error: "Can't retrieve data",
                err: err
            });
    });
};

module.exports = {
    addData,
    getData
};
