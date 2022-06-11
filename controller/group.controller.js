const jwt = require("jsonwebtoken");
const db = require("../models");
const env = require("../config/env");
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
      console.log(result);
      let newID = result.length != 0 ? result[0].groupID + 1 : 1;
      console.log(newID);
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
  const userID = req.body._id;
  Group.find({ users: { $elemMatch: { _id: userID } } })
    .then((data) => {
      res.send(data);
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
        message: "No such account found.",
        data: {},
      });
    } else {
      let newUser = { username: username, amount: 0 };
      obj.users.push(newUser);
      obj
        .save(obj)
        .then((groupInfo) => {
          return res.status(200).json({
            message: "Account profile successfully updated.",
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
