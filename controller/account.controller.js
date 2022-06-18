const jwt = require("jsonwebtoken");
const db = require("../models");
const env = require("../config/env");
const multer = require("multer");
const Account = db.account;
const mongoose = require("mongoose");

const jwtSecret = env.jwtSecret;
function createToken(id, email) {
  return jwt.sign({ id: id, email: email }, jwtSecret);
}

exports.createAccount = (req, res) => {
  const account = new Account({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
  });

  account
    .save(account)
    .then((accountInfo) => {
      let token = createToken(accountInfo._id, accountInfo.email);

      return res.status(200).json({
        message: "Account successfully created",
        data: { token: token, account: accountInfo },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    });
};

exports.updateAccount = (req, res) => {
  let uniqueID = req.body._id;

  var account = Account.findOne({ _id: uniqueID }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such account found.",
        data: {},
      });
    } else {
      obj.username = req.body.username;
      obj.email = req.body.email;
      obj.contact = req.body.contact;

      obj
        .save(obj)
        .then((accountInfo) => {
          return res.status(200).json({
            message: "Account profile successfully updated.",
            data: { account: accountInfo },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
        });
    }
  });
};

exports.login = (req, res) => {
  let username = req.body.username;

  var account = Account.findOne(
    { username: username },
    function (err, accountInfo) {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong! Error: " + err.message,
          data: {},
        });
      } else if (!accountInfo) {
        return res.status(500).json({
          message: "No such account found.",
          data: {},
        });
      } else {
        if (req.body.password == accountInfo.password) {
          let token = createToken(accountInfo._id, accountInfo.email);

          return res.status(200).json({
            message: "You have successfully sign in!",
            data: { token: token, account: accountInfo },
          });
        } else {
          return res.status(400).json({
            message: "Password mismatch!",
            data: {},
          });
        }
      }
    }
  );
};

exports.uploadImage = (req, res) => {
  // console.log(req);
  console.log(req.file.filename);
  console.log(req.body.id);
  let uniqueID = mongoose.Types.ObjectId(req.body.id);
  const url = req.protocol + "://" + req.get("host");

  var account = Account.findOne({ _id: uniqueID }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such account found.",
        data: {},
      });
    } else {
      obj.image = url + "/public/" + req.file.filename;
      obj
        .save(obj)
        .then((accountInfo) => {
          return res.status(200).json({
            message: "Image successfully uploaded/changed.",
            data: { account: accountInfo },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
        });
    }
  });
};

exports.removeImage = (req, res) => {
  const uniqueID = req.body._id;
  var account = Account.findOne({ _id: uniqueID }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such account found.",
        data: {},
      });
    } else {
      obj.image = "";
      obj
        .save(obj)
        .then((accountInfo) => {
          return res.status(200).json({
            message: "Image successfully removed.",
            data: { account: accountInfo },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
        });
    }
  });
};

exports.refresh = (req, res) => {
  let _id = req.body._id;
  var account = Account.findOne({ _id: _id }, function (err, accountInfo) {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else {
      return res.status(200).json({
        message: "Refreshed login status",
        data: { account: accountInfo },
      });
    }
  });
};

exports.retrieveTransactions = (req, res) => {
  const id = req.body._id;
  Account.findOne({ _id: id })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "No user found with id " + id });
      else
        res.status(200).json({
          message: "Retrieved Transactons",
          data: data.transactions,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving transactions with id=" + id });
    });
};

exports.addTransactions = (req, res) => {
  const id = req.body._id;
  const newData = req.body.data;
  var account = Account.findOne({ _id: id }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such user found.",
        data: {},
      });
    } else {
      obj.transactions.push(newData);
      obj
        .save(obj)
        .then((accountInfo) => {
          return res.status(200).json({
            message: "Transactions added successfully",
            data: { account: accountInfo },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
        });
    }
  });
};

exports.getAlerts = (req, res) => {
  const id = req.body._id;
  Account.findOne({ _id: id }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such user found.",
        data: {},
      });
    } else {
      // console.log(obj);
      return res.status(200).json({
        message: "Successfully retrieved user's pending payments.",
        data: { pending: obj.pending },
      });
    }
  });
};

// This might be problematic if there are duplicate alerts in the pending array of user
// might consider adding a date field in the alert but this needs to be cascaded down
// from the resetPayment function
exports.clearAlerts = (req, res) => {
  const id = req.body._id;
  const alert = req.body.alert;
  Account.updateOne({ _id: id }, { $pull: { pending: alert } }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such user found.",
        data: {},
      });
    } else {
      return res.status(200).json({
        message: "Successfully cleared user's pending payments.",
        data: obj,
      });
    }
  });
};

exports.getAdjustments = (req, res) => {
  const id = req.body._id;
  Account.findOne({ _id: id }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such user found.",
        data: {},
      });
    } else {
      // console.log(obj);
      return res.status(200).json({
        message: "Successfully retrieved user's pending payments.",
        data: { adjustments: obj.groupLog },
      });
    }
  });
};
