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

router.get("/summary", auth, groupController.displayGroups);

router.put("/join", groupController.joinGroup);

module.exports = router;
