const express = require("express");
const router = express.Router();
const chartController = require("../controller/chart.controller.js");
const auth = require("../controller/auth");


router.put("/piechart", chartController.getPieChartData);

router.put("/linechart", chartController.getLineChartData);

// router.get("/barchart", chartController.getBarChartData);



module.exports = router;
