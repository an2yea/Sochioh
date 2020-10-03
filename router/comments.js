const express = require("express");
const router = express.Router();
const passport = require("passport");

const Commentcontroller = require("../controller/commentController");
router.post("/create", passport.checkAuthentication, Commentcontroller.create);

module.exports = router;
