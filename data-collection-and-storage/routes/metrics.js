const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metrics")

router.get('/', metricsController.getForDomain);

module.exports = router;

