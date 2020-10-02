const express = require("express");
var router = express.Router();
const HController = require("../controller/homeController");

console.log("Home router loaded");
router.get("/", HController.home);
router.use("/users", require("./users"));

module.exports = router;
