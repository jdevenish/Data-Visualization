const RawData = require("../models/RawData");

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

const clearData = (req, res) => {
    RawData.find().then(allData => {
        allData.forEach(dataObj => {
            RawData.deleteOne({_id: dataObj._id}).catch(error => {
                console.error(error);
            })
        });
        res.status(200)
            .json({
                status: 200,
                message: "All data successfully deleted."
            })
    }).catch(error => {
        console.error(error)
    })
};

module.exports = {
    addData,
    getData,
    clearData
};
