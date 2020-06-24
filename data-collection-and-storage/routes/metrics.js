const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metrics");

router.get('/', metricsController.getForDomain);

router.post('/create', metricsController.create);

module.exports = router;

