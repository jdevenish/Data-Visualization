const Metric = require("../models/Metrics");

const getForDomain = (req, res) => {

};

const create = (req, res) => {
    const metricObj = new Metric;
    Metric.create(metricObj).then(resp => {
        res.status(200)
            .json({
                status: 200,
                id: resp._id
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
