const mongoose = require("mongoose");
mongoose.connect("mongodb:://localhost/Account");

const db = mongoose.connection;
db.on("error", console.error.bind("Error connecting"));
db.open("once", function () {
  console.log("Succesfully connected to Database");
});

module.exports = db;
