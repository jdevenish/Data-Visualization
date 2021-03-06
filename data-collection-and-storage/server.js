const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;


//git subtree push --prefix data-collection-and-storage heroku master

app.use(parser.json());
app.use(cors());

// Default Route
app.get("/", (req, res) => {
    // add redirect at some point
    res.status(200).json({
        "status": 200,
        "msg" : "server is up and running"
    })
});

const rawDataRoutes = require("./routes/rawData");
app.use("/data", rawDataRoutes);

const metricRoutes = require("./routes/metrics");
app.use("/metrics", metricRoutes);

// Set the port and configure server to listen on that port
app.set('port', PORT);
app.listen(app.get('port'), () => console.log(`PORT: ${app.get("port")} 🌟`));

