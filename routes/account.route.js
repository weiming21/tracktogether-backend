const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller.js");

router.post(
    "/",
    // AccountValidator.createAccount,
    // ErrorValidator.ifErrors,
    accountController.createAccount
  );

router.put(
  "/",
  // auth,
  // AccountValidator.updateAccount,
  // ErrorValidator.ifErrors,
  accountController.updateAccount
);
  
  router.post(
    "/login",
    // AccountValidator.login,
    // ErrorValidator.ifErrors,
    accountController.login
  );

  

module.exports = router;