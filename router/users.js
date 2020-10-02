const express = require("express");
//const { runInNewContext } = require('vm');
var router = express.Router();
const UserController = require("../controller/UserController");
console.log("User router loaded");
router.use("/sign_in", UserController.signin);
router.use("/sign_up", UserController.signup);

module.exports = router;
