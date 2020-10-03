const express = require("express");
var router = express.Router();
const HController = require("../controller/homeController");

console.log("Home router loaded");
router.get("/", HController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));

router.use("/api", require("./api"));
module.exports = router;
