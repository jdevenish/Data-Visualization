const express = require("express");
const router = express.Router();
const rawdataController = require("../controllers/rawData");


router.get('/', rawdataController.getData);

router.post('/create', rawdataController.addData);

router.delete('/clearData', rawdataController.clearData);

module.exports = router;
