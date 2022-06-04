const express = require("express");
const router = express.Router();

const accountRouter = require("./account.route");
const chartRouter = require("./chart.route");
router.use("/account", accountRouter);
router.use("/chart", chartRouter);

module.exports = router;