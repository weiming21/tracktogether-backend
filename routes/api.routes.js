const express = require("express");
const router = express.Router();

const accountRouter = require("./account.route");
const chartRouter = require("./chart.route");
const groupRouter = require("./group.route");
router.use("/account", accountRouter);
router.use("/chart", chartRouter);
router.use("/group", groupRouter);

module.exports = router;
