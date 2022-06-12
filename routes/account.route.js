const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller.js");
const auth = require("../controller/auth");
const { account } = require("../models/index.js");
const { get } = require("./group.route.js");

router.post(
  "/",
  // AccountValidator.createAccount,
  // ErrorValidator.ifErrors,
  accountController.createAccount
);

router.put(
  "/",
  auth,
  // AccountValidator.updateAccount,
  // ErrorValidator.ifErrors,
  accountController.updateAccount
);

router.get("/refresh", auth, accountController.refresh);

router.post(
  "/login",
  // AccountValidator.login,
  // ErrorValidator.ifErrors,
  accountController.login
);

router.put("/upload", auth, accountController.uploadImage);

router.get("/transactions", auth, accountController.retrieveTransactions);

router.put(
  "/transactions",
  // AccountValidator.login,
  // ErrorValidator.ifErrors,
  auth,
  accountController.addTransactions
);

router.get("/alerts", accountController.getAlerts);

router.put("/alerts", accountController.clearAlerts);

module.exports = router;
