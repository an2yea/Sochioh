const express = require("express");
const router = express.Router();
const passport = require("passport");

const Postcontroller = require("../controller/postController");
router.post("/create", passport.checkAuthentication, Postcontroller.create);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  Postcontroller.destroy
);
module.exports = router;
