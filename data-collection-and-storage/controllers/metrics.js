const Metric = require("../models/Metrics");


const getForDomain = (req, res) => {

};

const create = (req, res) => {
    Metric.create().then(resp => {
        res.status(200)
            .json({
                status: 200,
                metricObj: resp
            })
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                error: err
            })
    })
};


module.exports = {
    getForDomain,
    create
};
