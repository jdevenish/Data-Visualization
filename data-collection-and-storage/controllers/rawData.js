const RawData = require("../models/RawData");

const addData = (req, res) => {

    // Set date fields server side for consistency
    let date = new Date();
    req.body.loadTime.date = date;
    req.body.geolocation.date = date;

    // Create raw data entry
    RawData.create(req.body).then(() => {

        // Fetch all raw data and return for use with charts/graphs
        RawData.fetch().then(metrics => {

        }).catch(err => {
            res.status(200)
                .json({
                    status: 500,
                    error: err
                })
        });
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
