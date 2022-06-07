const env = require("../config/env");
const url = env.dbLink;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;

db.account = require("./account.model.js")(mongoose);
db.group = require("./group.model.js")(mongoose);

module.exports = db;
