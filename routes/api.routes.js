const express = require("express");
const router = express.Router();

const accountRouter = require("./account.route");
// const itemRouter = require("./item.route");
router.use("/account", accountRouter);
// router.use("/item", itemRouter);

module.exports = router;