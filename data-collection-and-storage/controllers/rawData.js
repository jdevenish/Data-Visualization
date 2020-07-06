const RawData = require("../models/RawData");
const MetricSchema = require("../models/Metrics");

const addData = (req, res) => {
    // Create raw data entry
    RawData.create(req.body).then(() => {
        RawData.find().then(allData => {
            let metricObj = new MetricSchema;


            metricObj.browser.chrome = 0;
            metricObj.browser.firefox = 0;
            metricObj.browser.safari = 0;
            metricObj.browser.ie = 0;
            metricObj.browser.other = 0;

            allData.forEach(dataObj => {
                // Browser
                switch (dataObj.deviceType) {
                    case "Firefox":
                        metricObj.browser.firefox += 1;
                        break;
                    case "Chrome":
                        metricObj.browser.chrome += 1;
                        break;
                    case "Safari":
                        metricObj.browser.safari += 1;
                        break;
                    case "IE":
                        metricObj.browser.ie += 1;
                        break;
                    case "":
                        break;
                    default:
                        metricObj.browser.other += 1;
                }

                // Device Type
                if(dataObj.screenWidth < 480) {
                    metricObj.deviceType.mobile += 1;
                } else if(768 <= dataObj.screenWidth && dataObj.screenWidth < 1024 ){
                    metricObj.deviceType.tablet += 1;
                } else if(dataObj.screenWidth >= 1024){
                    metricObj.deviceType.desktop += 1;
                }

                // Load Times
                // Add sort by date
                metricObj.loadTimes.data.push({
                    time: dataObj.loadTime.time,
                    date: dataObj.loadTime.date
                });
                metricObj.loadTimes.avg += dataObj.loadTime.time;

                if(metricObj.loadTimes.low > dataObj.loadTime.time){
                    metricObj.loadTimes.low = dataObj.loadTime.time;
                }

                if(metricObj.loadTimes.high < dataObj.loadTime.time) {
                    metricObj.loadTimes.high = dataObj.loadTime.time
                }

                // Locale
                // Define default sort and do that here. (date, city, etc..)
                metricObj.location.push(dataObj.geolocation);
            });

            res.status(200)
                .json(metricObj)
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

// Find and remove all raw data documents.
// Used to reset the collection for testing purposes.
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
