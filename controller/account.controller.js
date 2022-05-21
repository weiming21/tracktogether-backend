const jwt = require("jsonwebtoken");
const db = require("../models");
const Account = db.account;

const jwtSecret = "MYDIRTYLITTLESECRET";
function createToken (id, email) {
  return jwt.sign({ id: id, email: email }, jwtSecret);
};

exports.createAccount = (req, res) => {

    const account = new Account({
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
      });

    account
      .save(account)
      .then(accountInfo => {
        let token = createToken(accountInfo._id, accountInfo.email);
        
        return res.status(200).json({
            message: "Account successfully created",
            data: { token: token, account: accountInfo },
          });
      })
      .catch(err => {
        return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
      })
} 

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
      .then(accountInfo => {
        return res.status(200).json({
            message: "Account profile successfully updated.",
            data: { account: accountInfo },
          });
      })
      .catch(err => {
        return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
      })
    }  
  });
}

exports.login = (req, res) => {
  let username = req.body.username;

  var account = Account.findOne({ username: username }, function (err, accountInfo) {
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
  });
}