const jwt = require("jsonwebtoken");
const db = require("../models");
const env = require("../config/env");
const Account = db.account;
const mongoose = require("mongoose");

const jwtSecret = env.jwtSecret;
function createToken(id, email) {
  return jwt.sign({ id: id, email: email }, jwtSecret);
}

exports.getPieChartData = (req, res) => {
  let id = mongoose.Types.ObjectId(req.body._id)

  Account.aggregate([
    {$match: {_id: id}}, 
    {$unwind: "$transactions"}, 
    {$group: 
        {_id: "$transactions.category", 
        amount: {$sum: "$transactions.amount"}}
    }
  ],
  function(err, results) {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!results) {
      return res.status(404).json({
        message: "No such account found.",
        data: {},
      });
    } else {
      return res.status(200).json({
        message:'Retrieval success!',
        data:results
      });
    }
  }
  );
}



exports.getLineChartData = (req, res) => {
  let id = mongoose.Types.ObjectId(req.body._id)

  Account.aggregate(
    [{$unwind: "$transactions"}, 
      {$match: {_id: id}}, 
      {$group: 
        {_id: 
          {month: {$month: {$toDate: "$transactions.date"}}, 
          year: {$year: {$toDate: "$transactions.date"}}}, 
          amount: {$sum: "$transactions.amount"}}
      }
    ],
  function(err, results) {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    } else if (!results) {
      return res.status(404).json({
        message: "No such account found.",
        data: {},
      });
    } else {
      return res.status(200).json({
        message:'Retrieval success!',
        data:results
      });
    }
  }
  );
}