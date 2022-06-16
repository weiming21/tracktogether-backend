const multer = require("multer");
const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller.js");
const auth = require("../controller/auth");
const { account } = require("../models/index.js");
const { get } = require("./group.route.js");
const { upload } = require("../helpers/filehelper");
const db = require("../models");
const Account = db.account;

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

// router.put("/upload", auth, upload, accountController.uploadImage);

// router.put("/upload", auth, upload, (req, res, next) => {
//   let uniqueID = req.body._id;

//   var account = Account.findOne({ _id: uniqueID }, (err, obj) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     } else if (!obj) {
//       return res.status(500).json({
//         message: "No such account found.",
//         data: {},
//       });
//     } else {
//       obj.image = req.file;
//       obj
//         .save(obj)
//         .then((accountInfo) => {
//           return res.status(200).json({
//             message: "Image successfully uploaded/changed.",
//             data: { account: accountInfo },
//           });
//         })
//         .catch((err) => {
//           return res.status(500).json({
//             message: "Something went wrong! Error: " + err.message,
//             data: {},
//           });
//         });
//     }
//   });
// });

router.get("/transactions", auth, accountController.retrieveTransactions);

router.put(
  "/transactions",
  // AccountValidator.login,
  // ErrorValidator.ifErrors,
  auth,
  accountController.addTransactions
);

router.get("/alerts", auth, accountController.getAlerts);

router.put("/alerts", accountController.clearAlerts);

router.get("/adjustment", auth, accountController.getAdjustments);

module.exports = router;
