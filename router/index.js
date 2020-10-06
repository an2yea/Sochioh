const express = require("express");
var router = express.Router();
const passport = require("passport");
const HController = require("../controller/homeController");

console.log("Home router loaded");
router.get("/", passport.checkAuthentication, HController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/likes", require("./likes"));

router.use("/api", require("./api"));
module.exports = router;
