const url = "mongodb+srv://tracktogether5279:P%40ssw0rd5279tracktogether@cluster0.4svrt.mongodb.net/tracktogether?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;

db.account = require("./account.model.js")(mongoose);

module.exports = db;