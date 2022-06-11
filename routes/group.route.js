const express = require("express");
const router = express.Router();
const groupController = require("../controller/group.controller.js");
const auth = require("../controller/auth");

router.post(
  "/",
  auth,
  // AccountValidator.createAccount,
  // ErrorValidator.ifErrors,
  groupController.createGroup
);

router.put(
  "/",
  auth,
  // AccountValidator.updateAccount,
  // ErrorValidator.ifErrors,
  groupController.updateGroup
);

router.get("/summary", auth, groupController.displayGroups);

router.put("/join", auth, groupController.joinGroup);

router.put("/delete-member", groupController.deleteMember);

router.put("/delete-group", groupController.deleteGroup);

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
