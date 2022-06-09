const jwt = require("jsonwebtoken");
const db = require("../models");
const env = require("../config/env");
const HelperFunction = require("./helper.controller");
const Group = db.group;

// const jwtSecret = env.jwtSecret;
// function createToken(id, email) {
//   return jwt.sign({ id: id, email: email }, jwtSecret);
// }

exports.createGroup = (req, res) => {
  Group.find()
    .sort({ groupID: -1 })
    .limit(1)
    .then(function (result) {
      // console.log(result);
      let newID = result.length != 0 ? result[0].groupID + 1 : 1;
      // console.log(newID);
      const group = new Group({
        groupID: newID,
        name: req.body.name,
        users: { username: req.body.username, amount: 0 },
      });
      group
        .save(group)
        .then((groupInfo) => {
          //   let token = createToken(group.id, group.username);

          return res.status(200).json({
            message: "Group successfully created",
            // data: { token: token, group: groupInfo },
            data: { group: groupInfo },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
        });
    });
};

exports.updateGroup = (req, res) => {
  let uniqueID = req.body._id;

  var account = Group.findOne({ _id: uniqueID }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such group found.",
        data: {},
      });
    } else {
      obj.name = req.body.name;

      obj
        .save(obj)
        .then((groupInfo) => {
          return res.status(200).json({
            message: "Group profile successfully updated.",
            data: { group: groupInfo },
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

exports.displayGroups = (req, res) => {
  const username = req.body.username;
  Group.find({ users: { $elemMatch: { username: username } } })
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Successfully retrieved group information",
        data: { groups: data },
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving transactions with id=" + id });
    });
};
exports.joinGroup = (req, res) => {
  const groupID = req.body.groupID;
  const username = req.body.username;
  Group.findOne({ groupID: groupID }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such group found.",
        data: {},
      });
    } else {
      let newUser = { username: username, amount: 0 };
      obj.users.push(newUser);
      obj
        .save(obj)
        .then((groupInfo) => {
          return res.status(200).json({
            message: "Group joined successfully",
            data: { group: groupInfo },
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

exports.initiatePayment = (req, res) => {
  /*
  const description = req.body.description;
  const category = req.body.category;
  const totalAmount = req.body.amount;

  const groupID = req.body.groupID;
  const userAmounts = req.body.userAmounts; //json of username, 

  Group.findOne({ groupID: groupID }, (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!obj) {
      return res.status(500).json({
        message: "No such group found.",
        data: {},
      });
    } else {
      // let newUser = { username: username, amount: 0 };
      obj.log.push(userAmounts);
      obj
        .save(obj)
        .then((groupInfo) => {
          return res.status(200).json({
            message: "Successfully initiated payment",
            data: { group: groupInfo },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong! Error: " + err.message,
            data: {},
          });
        });
    }
  });*/
};

exports.resetPayments = (req, res) => {};

/* 
This API changes the acknowledgement status of the transaction log from false to true,
and simultaneously adds a new transaction in the users transaction log
*/
exports.acknowledgePayment = (req, res) => {};

// Optional API to KIV
exports.deleteMember = (req, res) => {};
exports.updateGroup = (req, res) => {};
exports.deleteGroup = (req, res) => {};
