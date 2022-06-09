const express = require("express");
const router = express.Router();
const groupController = require("../controller/group.controller.js");
const auth = require("../controller/auth");

router.post(
  "/",
  // AccountValidator.createAccount,
  // ErrorValidator.ifErrors,
  groupController.createGroup
);

router.put(
  "/",
  // AccountValidator.updateAccount,
  // ErrorValidator.ifErrors,
  groupController.updateGroup
);

router.post("/summary/:username", groupController.displayGroups);

router.put("/join", groupController.joinGroup);

router.post(
  "/initiatePayment",
  // AccountValidator.updateAccount,
  // ErrorValidator.ifErrors,
  groupController.initiatePayment
);

router.post(
  "/resetPayment",
  // AccountValidator.updateAccount,
  // ErrorValidator.ifErrors,
  groupController.resetPayments
);

router.post(
  "/acknowledgePayment",
  // AccountValidator.updateAccount,
  // ErrorValidator.ifErrors,
  groupController.acknowledgePayment
);

module.exports = router;
