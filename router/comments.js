const express = require("express");
const router = express.Router();
const passport = require("passport");

const Commentcontroller = require("../controller/commentController");
router.post("/create", passport.checkAuthentication, Commentcontroller.create);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  Commentcontroller.destroy
);
module.exports = router;
