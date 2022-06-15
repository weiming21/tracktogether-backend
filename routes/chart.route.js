const express = require("express");
const router = express.Router();
const chartController = require("../controller/chart.controller.js");
const auth = require("../controller/auth");

router.get("/piechart", auth, chartController.getPieChartData);

router.get("/linechart", auth, chartController.getLineChartData);

// router.get("/barchart", chartController.getBarChartData);

module.exports = router;
