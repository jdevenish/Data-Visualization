const RawData = require("../models/RawData");
const Metric = require("../models/Metrics");

const addData = (req, res) => {

    // Set date fields server side for consistency
    let date = new Date();
    req.body.loadTime.date = date;
    req.body.geolocation.date = date;

    // Create raw data entry
    RawData.create(req.body).then(() => {
        Metric.findOne({"_id": req.param('id') }).then(metric => {

            // Fetch all raw data and return for use with charts/graphs
            RawData.fetch().then(data => {
                data.forEach((site) => {
                    // Browser
                    switch (site.deviceType) {
                        case "Firefox":
                            metric.browser.firefox += 1;
                            break;
                        case "Chrome":
                            metric.browser.chrome += 1;
                            break;
                        case "Safari":
                            metric.browser.safari += 1;
                            break;
                        case "IE":
                            metric.browser.ie += 1;
                            break;
                        case "":
                            break;
                        default:
                            metric.browser.other += 1;
                    }

                    // Device Type
                    const screenWidth = site.screenWidth;
                    if(screenWidth < 480){
                        metric.deviceType.mobile += 1;
                    } else if(768 <= screenWidth && screenWidth < 1024 ){
                        metric.deviceType.tablet += 1;
                    } else if(screenWidth >= 1024){
                        metric.deviceType.desktop += 1;
                    }

                    // Load Times
                    metric.loadTimes.data.time.push(site.loadTime);
                    metric.loadTimes.avg += site.loadTime;
                    if(site.loadTime > metric.loadTimes.high){
                        metric.loadTimes.high = site.loadTime
                    }

                    if(metric.loadTimes.low === 0){
                        metric.loadTimes.low = site.loadTime
                    } else if(site.loadTime < metric.loadTimes.low && site.loadTime > 0){
                        metric.loadTimes.low = site.loadTime
                    }

                    // Locale
                    if(site.geolocation.lat !== 0 && site.geolocation.long !== 0){
                        metric.location.push({
                            lat: site.geolocation.lat,
                            long: site.geolocation.long
                        })
                    }
                });
                metric.loadTimes.avg = metric.loadTimes.avg / data.length;
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
